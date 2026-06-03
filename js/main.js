function gerarSenhasAleatorias(caracteres, tamanho) {
    let senha = ''

    for (let i = 0; i < tamanho; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length)
        senha += caracteres[indiceAleatorio]
    }

    return senha
}

const range = document.querySelector('#range')
const rangeValue = document.querySelector('#rangeValue')

range.addEventListener('input', () => {
    rangeValue.textContent = range.value
})

const checkbox = document.querySelectorAll('input[type="checkbox"]')
const checkboxUppercase = checkbox[0]
const checkboxLowercase = checkbox[1]
const checkboxNumbers = checkbox[2]
const checkboxSymbols = checkbox[3]

const btnGerar = document.querySelector('#btn_gerar_senha')
const inputSenha = document.querySelector('#password')
const btnCopiar = document.querySelector('.btn_copiar')

// Conjunto de caracteres
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowercase = 'abcdefghijklmnopqrstuvwxyz'
const numbers = '0123456789'
const symbols = '!@#$^&*()+-=[]{}|;:,.<>?'

// Cores da mensagem
const successColor = getComputedStyle(document.documentElement).getPropertyValue('--color-success')
const errorColor = getComputedStyle(document.documentElement).getPropertyValue('--color-error')
const warningColor = getComputedStyle(document.documentElement).getPropertyValue('--color-warning')
const infoColor = getComputedStyle(document.documentElement).getPropertyValue('--color-info')


btnGerar.addEventListener('click', () => {
    if (checkboxUppercase.checked || checkboxLowercase.checked || checkboxNumbers.checked || checkboxSymbols.checked) {
        let caracteres = ''

        if (checkboxUppercase.checked) {
            caracteres += uppercase
        }

        if (checkboxLowercase.checked) {
            caracteres += lowercase
        }

        if (checkboxNumbers.checked) {
            caracteres += numbers
        }

        if (checkboxSymbols.checked) {
            caracteres += symbols
        }

        inputSenha.value = gerarSenhasAleatorias(caracteres, range.value)

        Toastify({
            text: 'Sua senha está pronta!!',
            duration: 1500,
            style: {
                background: successColor
            }
        }).showToast()
        
    } else {
        Toastify({
            text: 'Marque pelo menos uma das opções!',
            duration: 3000,
            style: {
                background: errorColor
            }
        }).showToast()
    }
})

btnCopiar.addEventListener('click', () => {
    if (!inputSenha.value) {
        Toastify({
            text: 'Primeiro gera a senha, e depois podes copiar!',
            duration: 3000,
            style: {
                background: warningColor
            }
        }).showToast()
    } else {
        navigator.clipboard.writeText(inputSenha.value)
        inputSenha.select()
        btnCopiar.textContent = 'Copiado'

        setTimeout(() => {
            Toastify({
            text: `Senha copiada com sucesso: ${inputSenha.value}!`,
            duration: 3000,
            style: {
                background: successColor
            }
        }).showToast()

            btnCopiar.textContent = 'Copiar'
        }, 500)
    }
})