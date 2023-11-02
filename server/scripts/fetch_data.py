import pandas as pd
from yahooquery import Ticker
import sys
import json
import datetime

ticker_symbol = sys.argv[1]

# Initialize the Ticker object with the dynamic ticker_symbol
ticker = Ticker(ticker_symbol)

# Fetching company asset profile
company_profile = ticker.asset_profile[ticker_symbol]

# Fetching financial statements
income_statement_df = ticker.income_statement()
income_statement_df.fillna(0, inplace=True)
income_statement = income_statement_df.to_dict(orient='split')

cash_flow_statement_df = ticker.cash_flow()
cash_flow_statement_df.fillna(0, inplace=True)
cash_flow_statement = cash_flow_statement_df.to_dict(orient='split')

balance_sheet_df = ticker.cash_flow()
balance_sheet_df.fillna(0, inplace=True)
balance_sheet = balance_sheet_df.to_dict(orient='split')

# Fetching institutional ownership data
institutional_holders = ticker.institution_ownership.to_dict(orient='split')

# Fetching historical stock data

one_day = ticker.history(period='1d', interval='1m').reset_index().to_dict(orient='records')
five_day = ticker.history(period='5d', interval='5m').reset_index().to_dict(orient='records')
one_month = ticker.history(period='1mo', interval='15m').reset_index().to_dict(orient='records')
six_month = ticker.history(period='6mo', interval='1h').reset_index().to_dict(orient='records')
one_year = ticker.history(period='1y', interval='1d').reset_index().to_dict(orient='records')
five_year = ticker.history(period='5y', interval='1d').reset_index().to_dict(orient='records')
max_chart = ticker.history(period='max', interval='1wk').reset_index().to_dict(orient='records')

# Consolidate all dictionaries into one
combined_data = {
    'companyProfile': company_profile,
    'incomeStatement': income_statement,
    'cashFlowStatement': cash_flow_statement, 
    'balanceSheet': balance_sheet,
    'institutionalHolders': institutional_holders,
    'oneDayChart': one_day,
    'fiveDayChart': five_day,
    'oneMonthChart': one_month,
    'sixMonthChart': six_month,
    'oneYearChart': one_year,
    'fiveYearChart': five_year,
    'maxChart': max_chart
}

# Formating dates in charts
def format_one_day(dt):
    return dt.strftime('%I%p')

def format_five_day_one_month(dt):
    return dt.strftime('%b %d')

def format_six_month_one_year(dt):
    return dt.strftime('%b %Y')

def format_five_year_max(dt):
    return dt.strftime('%Y')

for record in one_day:
    record['date'] = format_one_day(record['date'])

for record in five_day:
    record['date'] = format_five_day_one_month(record['date'])

for record in one_month:
    record['date'] = format_five_day_one_month(record['date'])

for record in five_year:
    record['date'] = format_five_year_max(record['date'])

for record in max_chart:
    record['date'] = format_five_year_max(record['date'])

def handle_datetime(obj):
    if isinstance(obj, pd.Timestamp):
        return obj.strftime('%Y-%m-%d %H:%M:%S')  
    elif isinstance(obj, datetime.date):
        return obj.strftime('%Y-%m-%d')
    elif pd.isna(obj):
        return 0
    raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")

# This is for debugging purposes
for key, value in combined_data.items():
    try:
        json.dumps(value, default=handle_datetime)
    except Exception as e:
        print(f"Error in {key}: {e}")
        print(value)

# Convert the consolidated dictionary to a JSON string and store in a file
with open('financial_data.json', 'w') as f:
    json.dump(combined_data, f, default=handle_datetime)

# Convert the consolidated dictionary to a JSON string and print
json_string = json.dumps(combined_data, default=handle_datetime)
print(json_string)
