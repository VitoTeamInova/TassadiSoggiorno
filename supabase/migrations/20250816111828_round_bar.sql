/*
  # Add User Authentication and Data Isolation

  1. Database Changes
    - Add `user_id` column to `stays` table to link stays to authenticated users
    - Add `user_id` column to `app_config` table to allow per-user configurations
    - Update RLS policies to ensure users can only access their own data

  2. Security
    - Enable RLS on both tables with user-specific policies
    - Users can only read/write their own stays and config
    - Anonymous users have no access to any data

  3. Data Migration
    - Existing data will need to be manually assigned to users after they sign up
*/

-- Add user_id column to stays table
ALTER TABLE stays ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add user_id column to app_config table  
ALTER TABLE app_config ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update RLS policies for stays table
DROP POLICY IF EXISTS "Allow all operations on stays" ON stays;

CREATE POLICY "Users can manage their own stays"
  ON stays
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Update RLS policies for app_config table
DROP POLICY IF EXISTS "Allow all operations on app_config" ON app_config;

CREATE POLICY "Users can manage their own config"
  ON app_config
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_stays_user_id ON stays(user_id);
CREATE INDEX IF NOT EXISTS idx_app_config_user_id ON app_config(user_id);