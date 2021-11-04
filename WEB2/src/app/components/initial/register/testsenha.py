from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("http://localhost:4200/register")

senha = driver.find_element_by_id("password")
confSenha = driver.find_element_by_id("passwordConfirm")
cadastro = driver.find_element_by_id("cadastrarReg")

"campo de confirmação vazio"
def teste1():
    senha.clear()
    senha.send_keys("senha123")
    confSenha.clear()
    cadastro.click()
    if driver.find_element(By.CLASS_NAME("mat-simple-snackbar")).text == 'senha não confere' :
        print("teste 1 executado com sucesso")



"campo de confirmação diferente"
def teste2():
    senha.clear()
    confSenha.clear()
    senha.send_keys("senha123")
    confSenha.send_keys("senha1232")
    cadastro.click()
    if driver.find_element(By.CLASS_NAME("mat-simple-snackbar")).text == 'senha não confere' :
        print("teste 2 executado com sucesso")

"campo de confirmação igual"
def teste2():
    senha.clear()
    confSenha.clear()
    senha.send_keys("senha123")
    confSenha.send_keys("senha123")
    cadastro.click()
    if driver.find_element(By.CLASS_NAME("mat-simple-snackbar")).text != 'senha não confere' :
        print("teste 3 executado com sucesso")

driver.close()