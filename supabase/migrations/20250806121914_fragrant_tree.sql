/*
  # Create database schema for B&B tax calculator

  1. New Tables
    - `stays`
      - `id` (uuid, primary key)
      - `entry_date` (date)
      - `first_name` (text)
      - `last_name` (text)
      - `num_guests` (integer, must be > 0)
      - `num_minors` (integer, default 0, must be >= 0)
      - `num_nights` (integer, must be > 0)
      - `daily_tax` (numeric, must be >= 0)
      - `total_tax` (numeric, must be >= 0)
      - `month` (integer, 1-12)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `app_config`
      - `id` (uuid, primary key)
      - `app_name` (text, default app name)
      - `year` (integer, default current year)
      - `month` (integer, default current month, 1-12)
      - `default_daily_tax` (numeric, default 2.00, must be >= 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public access (suitable for single-user B&B app)

  3. Performance
    - Add indexes on frequently queried columns
    - Add triggers for automatic timestamp updates
*/

-- Create function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create stays table
CREATE TABLE IF NOT EXISTS stays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_date date NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  num_guests integer NOT NULL CHECK (num_guests > 0),
  num_minors integer NOT NULL DEFAULT 0 CHECK (num_minors >= 0),
  num_nights integer NOT NULL CHECK (num_nights > 0),
  daily_tax numeric(10,2) NOT NULL CHECK (daily_tax >= 0),
  total_tax numeric(10,2) NOT NULL CHECK (total_tax >= 0),
  month integer NOT NULL CHECK (month >= 1 AND month <= 12),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create app_config table
CREATE TABLE IF NOT EXISTS app_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  app_name text NOT NULL DEFAULT 'TeamInova B&B Local Stay Tax Calculator',
  year integer NOT NULL DEFAULT EXTRACT(year FROM CURRENT_DATE),
  month integer NOT NULL DEFAULT EXTRACT(month FROM CURRENT_DATE) CHECK (month >= 1 AND month <= 12),
  default_daily_tax numeric(10,2) NOT NULL DEFAULT 2.00 CHECK (default_daily_tax >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE stays ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_config ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access
CREATE POLICY "Allow all operations on stays"
  ON stays
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on app_config"
  ON app_config
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_stays_entry_date ON stays (entry_date);
CREATE INDEX IF NOT EXISTS idx_stays_month ON stays (month);
CREATE INDEX IF NOT EXISTS idx_stays_created_at ON stays (created_at);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_stays_updated_at
  BEFORE UPDATE ON stays
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_app_config_updated_at
  BEFORE UPDATE ON app_config
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default configuration if none exists
INSERT INTO app_config (app_name, year, month, default_daily_tax)
SELECT 'TeamInova B&B Local Stay Tax Calculator', 
       EXTRACT(year FROM CURRENT_DATE)::integer,
       EXTRACT(month FROM CURRENT_DATE)::integer,
       2.00
WHERE NOT EXISTS (SELECT 1 FROM app_config);