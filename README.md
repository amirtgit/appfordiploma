Как установить:

 --branch branch_4    чтобы клонировать только эту ветку

Создай файл .env в главной папке и добавь OPENAI_KEY=здесь ключ от openai api

py -3 -m venv .venv   чтобы создать среду разработки

 .venv\Scripts\activate   чтобы зайти в среду, входить в среду так всегда,  чтобы выйти из среды пишите deactivate   
 
   pip install -r requirements.txt  чтобы установить все пакеты flask

 flask db upgrade установить базу данных на sqlite

  flask run   запуск приложения   выход через ctrl+c

tests.py не трогать, можно просто удалить
