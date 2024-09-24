// Declarar la variable currentOperation globalmente para que esté disponible en todas las funciones
let currentOperation = {};

// Añadir los listeners
document.getElementById('check-answer').addEventListener('click', checkAnswer);
document.getElementById('clear-grid').addEventListener('click', clearGrid);
document.getElementById('operation-type').addEventListener('change', handleOperationChange);
document.getElementById('digit-range').addEventListener('change', generateOperation);

function handleOperationChange() {
    const operationType = document.getElementById('operation-type').value;

    // Mostrar u ocultar el selector de "valor absoluto" solo para restas
    if (operationType === 'subtract') {
        document.getElementById('absolute-value-selector').style.display = 'block';
    } else {
        document.getElementById('absolute-value-selector').style.display = 'none';
    }

    generateOperation(); // Generar nueva operación cuando se cambia el tipo de operación
}

function generateOperation() {
    // Obtener tipo de operación y rango de dígitos seleccionados
    const operationType = document.getElementById('operation-type').value;
    const digitRange = parseInt(document.getElementById('digit-range').value);

    // Generar num1 y num2 en función del rango de dígitos
    const num1 = Math.floor(Math.random() * digitRange) + (digitRange / 5);
    const num2 = Math.floor(Math.random() * digitRange) + (digitRange / 5);

    let operationSymbol = '';
    let correctFinalResult = 0;

    // Definir la operación según el selector
    switch (operationType) {
        case 'add':
            operationSymbol = '+';
            correctFinalResult = num1 + num2;
            break;
        case 'subtract':
            operationSymbol = '-';
            correctFinalResult = num1 - num2;
            break;
        case 'multiply':
            operationSymbol = '*';
            correctFinalResult = num1 * num2;
            break;
        case 'divide':
            operationSymbol = '/';
            correctFinalResult = parseFloat((num1 / num2).toFixed(2)); // Redondear a 2 decimales
            break;
        default:
            operationSymbol = '+';
            correctFinalResult = num1 + num2;
    }

    // Actualizar el texto de la operación
    document.getElementById('operation').textContent = `¿Cómo descompones ${num1} ${operationSymbol} ${num2}?`;

    // Almacenar la operación actual
    currentOperation = { num1, num2, operationType, correctFinalResult };
}

function checkAnswer() {
    const finalResult = parseFloat(document.getElementById('final-result').value) || 0;
    const correctFinalResult = currentOperation.correctFinalResult;

    // Obtener el nombre del alumno
    const studentName = document.getElementById('student-name').value || 'alumno'; // Si no introduce nombre, por defecto es "alumno"

    // Obtener el estado del selector de valor absoluto
    const allowAbsolute = document.getElementById('allow-absolute').checked;

    // Verificación especial para restas con opción de valor absoluto
    if (currentOperation.operationType === 'subtract' && allowAbsolute) {
        // Si se permite valor absoluto, comparamos el valor absoluto del resultado
        if (Math.abs(finalResult) === Math.abs(correctFinalResult)) {
            showCorrectFeedback(correctFinalResult, studentName);
        } else {
            showIncorrectFeedback(correctFinalResult, studentName);
        }
    } else {
        // Verificación normal para el resto de operaciones o cuando no se permite valor absoluto
        if (finalResult === correctFinalResult) {
            showCorrectFeedback(correctFinalResult, studentName);
        } else {
            showIncorrectFeedback(correctFinalResult, studentName);
        }
    }
}

function showCorrectFeedback(correctFinalResult, studentName) {
    document.getElementById('feedback').textContent = `¡Correcto ${studentName}! El resultado es ${correctFinalResult}`;
    document.getElementById('feedback').style.color = 'green';

    // Mostrar imagen de acierto
    document.getElementById('feedback-image').src = 'https://media.makeameme.org/created/el-arte-callejero-2077d26884.jpg';
    document.getElementById('feedback-image').style.display = 'block';
    document.getElementById('resultado').style.display = 'grid';
}

function showIncorrectFeedback(correctFinalResult, studentName) {
    document.getElementById('feedback').textContent = `Incorrecto ${studentName}. El resultado correcto es ${correctFinalResult}`;
    document.getElementById('feedback').style.color = 'red';

    // Mostrar imagen de error
    document.getElementById('feedback-image').src = 'https://statics.memondo.com/p/s1/ccs/2021/01/CC_2778612_4ed54c1f39a54a4d9906d44c523f1a1a_a_nadie_le_importa_que_decepcion.jpg';
    document.getElementById('feedback-image').style.display = 'block';
    document.getElementById('resultado').style.display = 'grid';
}


function clearGrid() {
    // Limpiar los campos de la rejilla
    document.getElementById('oper-note1').value = '';
    document.getElementById('units-note1').value = '';
    document.getElementById('tens-note1').value = '';
    document.getElementById('oper-note2').value = '';
    document.getElementById('tens-note2').value = '';
    document.getElementById('units-note2').value = '';
    document.getElementById('oper-note3').value = '';
    document.getElementById('tens-note3').value = '';
    document.getElementById('units-note3').value = '';
    document.getElementById('oper-note4').value = '';
    document.getElementById('tens-note4').value = '';
    document.getElementById('units-note4').value = '';

    // Limpiar el resultado y feedback
    document.getElementById('final-result').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback-image').style.display = 'none'; // Ocultar imagen de feedback
    document.getElementById('resultado').style.display = 'none'; // Ocultar imagen de feedback

    // Generar una nueva operación al limpiar
    generateOperation();
}

// Generar la primera operación cuando carga la página
generateOperation();

  