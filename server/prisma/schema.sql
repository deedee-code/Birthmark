BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE SCHEMA IF NOT EXISTS celebration;
SET search_path = celebration, public;

CREATE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  full_name text NOT NULL,
  timezone text NOT NULL DEFAULT 'UTC',
  is_paused boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE users IS 'Stores registered user accounts.';
CREATE INDEX idx_users_timezone ON users(timezone);

CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text,
  phone text NOT NULL,
  birthday_day smallint NOT NULL CHECK (birthday_day BETWEEN 1 AND 31),
  birthday_month smallint NOT NULL CHECK (birthday_month BETWEEN 1 AND 12),
  relationship_type text NOT NULL DEFAULT 'friend' CHECK (relationship_type IN ('friend', 'family', 'colleague', 'partner', 'other')),
  relationship_custom text,
  preferred_channel text NOT NULL DEFAULT 'whatsapp' CHECK (preferred_channel IN ('whatsapp', 'sms')),
  preferred_send_time time NOT NULL DEFAULT '09:00:00',
  timezone text NOT NULL DEFAULT 'UTC',
  is_active boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW(),
  CHECK (
    (relationship_type = 'other' AND relationship_custom IS NOT NULL)
    OR (relationship_type <> 'other' AND relationship_custom IS NULL)
  )
);
COMMENT ON TABLE contacts IS 'Stores the people a user wants to send birthday wishes to, each with its own delivery preferences.';
CREATE INDEX idx_contacts_user_id ON contacts(user_id);
CREATE INDEX idx_contacts_birthday ON contacts(birthday_day, birthday_month);
CREATE INDEX idx_contacts_preferred_channel ON contacts(preferred_channel);
CREATE INDEX idx_contacts_is_active ON contacts(is_active);

CREATE TABLE templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  body text NOT NULL,
  channel text NOT NULL CHECK (channel IN ('whatsapp', 'sms', 'any')),
  is_default boolean NOT NULL DEFAULT false,
  is_ai_generated boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, name)
);
COMMENT ON TABLE templates IS 'Stores reusable message templates with placeholders for contact variables.';
CREATE INDEX idx_templates_user_id ON templates(user_id);
CREATE INDEX idx_templates_channel ON templates(channel);

CREATE TABLE scheduled_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  contact_id uuid NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  template_id uuid REFERENCES templates(id) ON DELETE SET NULL,
  message_body text NOT NULL,
  channel text NOT NULL CHECK (channel IN ('whatsapp', 'sms')),
  job_type text NOT NULL CHECK (job_type IN ('reminder', 'birthday')),
  scheduled_for timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'sent', 'failed', 'cancelled')),
  attempt_count smallint NOT NULL DEFAULT 0,
  last_attempted_at timestamptz,
  sent_at timestamptz,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE scheduled_messages IS 'One row per scheduled delivery attempt for reminders and birthday messages.';
CREATE INDEX idx_scheduled_messages_user_id ON scheduled_messages(user_id);
CREATE INDEX idx_scheduled_messages_contact_id ON scheduled_messages(contact_id);
CREATE INDEX idx_scheduled_messages_template_id ON scheduled_messages(template_id);
CREATE INDEX idx_scheduled_messages_status ON scheduled_messages(status);
CREATE INDEX idx_scheduled_messages_scheduled_for ON scheduled_messages(scheduled_for);

CREATE TABLE notification_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scheduled_message_id uuid REFERENCES scheduled_messages(id) ON DELETE SET NULL,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  contact_id uuid REFERENCES contacts(id) ON DELETE SET NULL,
  channel text NOT NULL CHECK (channel IN ('whatsapp', 'sms')),
  job_type text NOT NULL CHECK (job_type IN ('reminder', 'birthday')),
  status text NOT NULL CHECK (status IN ('sent', 'failed')),
  provider text,
  provider_message_id text,
  provider_response jsonb,
  error_message text,
  sent_at timestamptz NOT NULL DEFAULT NOW(),
  created_at timestamptz NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE notification_logs IS 'Immutable audit log of every delivery attempt; rows are never updated or deleted.';
CREATE INDEX idx_notification_logs_scheduled_message_id ON notification_logs(scheduled_message_id);
CREATE INDEX idx_notification_logs_user_id ON notification_logs(user_id);
CREATE INDEX idx_notification_logs_contact_id ON notification_logs(contact_id);
CREATE INDEX idx_notification_logs_status ON notification_logs(status);

CREATE TABLE password_resets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE password_resets IS 'Manages password reset tokens for user account recovery.';
CREATE INDEX idx_password_resets_user_id ON password_resets(user_id);

CREATE TRIGGER set_updated_at_users
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_updated_at_contacts
  BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_updated_at_templates
  BEFORE UPDATE ON templates
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_updated_at_scheduled_messages
  BEFORE UPDATE ON scheduled_messages
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

WITH created_user AS (
  INSERT INTO users (email, password_hash, full_name, timezone)
  VALUES ('test@birthmark.app', 'HASHED_PASSWORD_PLACEHOLDER', 'Test User', 'Africa/Lagos')
  RETURNING id
)
INSERT INTO contacts (
  user_id, first_name, last_name, phone, birthday_day, birthday_month,
  relationship_type, relationship_custom, preferred_channel, preferred_send_time, timezone, is_active, notes
)
SELECT id, 'Ayo', 'Johnson', '+2348012345678', 15, 8,
  'friend', NULL, 'whatsapp', '09:00:00', 'Africa/Lagos', true, 'Seed contact for WhatsApp delivery.'
FROM created_user
UNION ALL
SELECT id, 'Mary', 'Smith', '+2348098765432', 20, 11,
  'other', 'mentor', 'sms', '10:30:00', 'Africa/Lagos', true, 'Seed contact for SMS mentor delivery.'
FROM created_user;

COMMIT;
