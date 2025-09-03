/*
  # Add language support to app_config table

  1. Schema Changes
    - Add `language` column to `app_config` table with default value 'it' (Italian)
    - Column allows storing language preference for each user's configuration

  2. Data Migration
    - Set default language to 'it' for existing configurations
    - Ensure all existing users have Italian as their default language

  3. Constraints
    - Language column accepts only 'it' and 'en' values
    - Default value is 'it' (Italian)
*/

-- Add language column to app_config table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'app_config' AND column_name = 'language'
  ) THEN
    ALTER TABLE app_config ADD COLUMN language text DEFAULT 'it' NOT NULL;
  END IF;
END $$;

-- Add constraint to ensure only valid language codes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE constraint_name = 'app_config_language_check'
  ) THEN
    ALTER TABLE app_config ADD CONSTRAINT app_config_language_check 
    CHECK (language IN ('it', 'en'));
  END IF;
END $$;

-- Update existing records to have Italian as default language
UPDATE app_config SET language = 'it' WHERE language IS NULL;