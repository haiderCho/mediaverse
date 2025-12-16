import csv
import os

# Updated to use the original backup file
INPUT_FILE = r'public/OGiMDB.csv'
OUTPUT_FILE = r'public/iMDB_cleaned.csv' # Temporary output
FINAL_FILE = r'public/iMDB.csv'

# Columns to keep 
KEEP_COLUMNS = [
    'Const', 'Title', 'Title Type', 'IMDb Rating', 
    'Runtime (mins)', 'Year', 'Genres', 'Num Votes', 
    'Release Date', 'Directors', 'Your Rating'
]

TARGET_TYPES = {'Movie', 'TV Series'}
EXCLUDED_GENRES = {'Animation', 'Game-Show', 'Video Game'} 

def clean_csv():
    # Check if input file exists
    if not os.path.exists(INPUT_FILE):
        print(f"Error: {INPUT_FILE} not found.")
        return

    print(f"Reading from {INPUT_FILE}...")
    
    with open(INPUT_FILE, mode='r', encoding='utf-8', newline='') as infile:
        reader = csv.DictReader(infile)
        
        # Verify columns exist
        missing_cols = [col for col in KEEP_COLUMNS if col not in reader.fieldnames]
        if missing_cols:
            print(f"Warning: The following columns were not found in the input CSV: {missing_cols}")
        
        # Filter available columns
        available_columns = [col for col in KEEP_COLUMNS if col in reader.fieldnames]
        
        rows_to_write = []
        excluded_count = 0
        total_read = 0
        
        for row in reader:
            total_read += 1
            title_type = row.get('Title Type')
            genres = row.get('Genres', '') or ''
            
            # 1. Filter by Title Type
            if title_type not in TARGET_TYPES:
                continue
                
            # 2. Filter by Excluded Genres (Anime/Games)
            if any(ex in genres for ex in EXCLUDED_GENRES):
                excluded_count += 1
                continue
            
            # Create a new row dictionary with only the columns we want
            filtered_row = {col: row[col] for col in available_columns}
            rows_to_write.append(filtered_row)
                
    print(f"Read {total_read} rows.")
    print(f"Filtered down to {len(rows_to_write)} rows.")
    print(f"Excluded {excluded_count} rows based on genre (Animation/Game-Show).")
    
    # Write to temp file first
    with open(OUTPUT_FILE, mode='w', encoding='utf-8', newline='') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=available_columns)
        writer.writeheader()
        writer.writerows(rows_to_write)
        
    print(f"Written cleaned data to {OUTPUT_FILE}")
    
    # Replace original file
    try:
        if os.path.exists(FINAL_FILE):
             os.remove(FINAL_FILE) # Remove old corrupted file if it exists
        os.replace(OUTPUT_FILE, FINAL_FILE)
        print(f"Successfully created {FINAL_FILE} with cleaned data.")
    except OSError as e:
        print(f"Error overwriting file: {e}")

if __name__ == "__main__":
    clean_csv()
