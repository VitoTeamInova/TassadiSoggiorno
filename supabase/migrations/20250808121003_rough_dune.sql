/*
  # Add notes fields and logo configuration

  1. Database Changes
    - Add `pre_stay_notes` column to `stays` table (text, up to 1000 characters)
    - Add `post_stay_notes` column to `stays` table (text, up to 1000 characters)
    - Add `logo_url` column to `app_config` table (text, for logo image URL)

  2. Security
    - Maintain existing RLS policies
    - Add constraints for text length limits

  3. Data Integrity
    - Use safe column additions with IF NOT EXISTS checks
    - Set appropriate defaults for new columns
*/

-- Add notes columns to stays table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'stays' AND column_name = 'pre_stay_notes'
  ) THEN
    ALTER TABLE stays ADD COLUMN pre_stay_notes text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'stays' AND column_name = 'post_stay_notes'
  ) THEN
    ALTER TABLE stays ADD COLUMN post_stay_notes text DEFAULT '';
  END IF;
END $$;

-- Add logo URL to app_config table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'app_config' AND column_name = 'logo_url'
  ) THEN
    ALTER TABLE app_config ADD COLUMN logo_url text DEFAULT '';
  END IF;
END $$;

-- Add constraints for text length limits
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'stays_pre_stay_notes_length_check'
  ) THEN
    ALTER TABLE stays ADD CONSTRAINT stays_pre_stay_notes_length_check 
    CHECK (char_length(pre_stay_notes) <= 1000);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'stays_post_stay_notes_length_check'
  ) THEN
    ALTER TABLE stays ADD CONSTRAINT stays_post_stay_notes_length_check 
    CHECK (char_length(post_stay_notes) <= 1000);
  END IF;
END $$;