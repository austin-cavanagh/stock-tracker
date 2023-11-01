import pandas as pd
import yfinance as yf

msft = yf.Ticker('msft')
info = msft.info

print(info)


# institutional_holders = msft.institutional_holders

# balance_sheet = msft.balance_sheet
# income_statement = appl.income_stmt
# cash_flow_statment = appl.cash_flow

# one_day = msft.history(period='1d', interval='1m')
# 382
# five_day = msft.history(period='5d', interval='5m')
# 390
# one_month = msft.history(period='1mo', interval='15m') 
# 572
# six_month = msft.history(period='6mo', interval='1h')
# 892
# one_year = msft.history(period='1y', interval='1d')
# 251
# five_year = msft.history(period='5y', interval='1d')
# 1257
# max = msft.history(period='max', interval='1wk')
# 1965