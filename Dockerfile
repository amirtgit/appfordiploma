FROM python:slim

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN pip install gunicorn pymysql cryptography

COPY app app
COPY migrations migrations
COPY define.py config.py boot.sh ./
RUN chmod a+x boot.sh


EXPOSE 5000
ENTRYPOINT ["./boot.sh"]