from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By


driver = webdriver.Chrome()
driver.get("http://localhost:4200/register")

email = driver.find_element_by_id("email")
cadastro = driver.find_element_by_id("cadastrarReg")

"campo vazio"
def teste1():
    email.clear()
    cadastro.click()
    if driver.find_element(By.CLASS_NAME("mat-simple-snackbar")).text == 'email inválido' :
        print("teste 1 executado com sucesso")

"email invalido"
def teste2():
    email.clear()
    email.send_keys("emailinvalido")
    cadastro.click()
    if driver.find_element(By.CLASS_NAME("mat-simple-snackbar")).text == 'email inválido' :
        print("teste 2 executado com sucesso")

"email ja cadastrado"
def teste3():
    email.clear()
    email.send_keys("aluno@aluno.com")
    cadastro.click()
    if driver.find_element(By.CLASS_NAME("mat-simple-snackbar")).text == 'email já cadastrado' :
        print("teste 3 executado com sucesso")

"email valido"
def teste4():
    email.clear()
    email.send_keys("email@email.com")
    cadastro.click()
    if driver.find_element(By.CLASS_NAME("mat-simple-snackbar")).text != 'email inválido' :
        print("teste 4 executado com sucesso")
 
teste1()
teste2()
teste3()
teste4()

driver.close()