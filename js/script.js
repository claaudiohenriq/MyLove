let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function(){
    nextImg();
},3000)

function nextImg(){
    count++;
    if(count>19){
        count = 1;
    }
    document.getElementById("radio"+count).checked = true;
}

const startDate = new Date('2024-08-11T00:00:00'); // Data de início: 9 de março de 2024
const yearsSpan = document.getElementById('years');
const monthsSpan = document.getElementById('months');
const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');

function updateTimeMarker() {
    const now = new Date();
    const diffMillis = now.getTime() - startDate.getTime(); // Diferença em milissegundos

    // Cálculo de anos e meses é mais complexo devido à variação de dias nos meses/anos.
    // Usamos o objeto Date para simular o crescimento ao longo do tempo.
    let tempDate = new Date(startDate);
    let years = 0;
    let months = 0;

    // Calcula anos completos
    while (tempDate.getFullYear() < now.getFullYear() || 
           (tempDate.getFullYear() === now.getFullYear() && tempDate.getMonth() < now.getMonth()) ||
           (tempDate.getFullYear() === now.getFullYear() && tempDate.getMonth() === now.getMonth() && tempDate.getDate() <= now.getDate())) {
        
        const nextYearDate = new Date(tempDate.getFullYear() + 1, tempDate.getMonth(), tempDate.getDate());
        if (nextYearDate <= now) {
            years++;
            tempDate = nextYearDate;
        } else {
            break;
        }
    }

    // Calcula meses completos a partir da data ajustada pelos anos
    while (tempDate.getFullYear() < now.getFullYear() || 
           (tempDate.getFullYear() === now.getFullYear() && tempDate.getMonth() < now.getMonth()) ||
           (tempDate.getFullYear() === now.getFullYear() && tempDate.getMonth() === now.getMonth() && tempDate.getDate() <= now.getDate())) {
        
        const nextMonthDate = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, tempDate.getDate());
        if (nextMonthDate <= now) {
            months++;
            tempDate = nextMonthDate;
        } else {
            break;
        }
    }

    // Calcula os dias restantes
    const msPerDay = 1000 * 60 * 60 * 24;
    const remainingDaysMillis = now.getTime() - tempDate.getTime();
    const days = Math.floor(remainingDaysMillis / msPerDay);

    // Calcula horas, minutos e segundos a partir do restante do dia atual
    const secondsTotal = Math.floor((remainingDaysMillis % msPerDay) / 1000);

    const hours = Math.floor(secondsTotal / (60 * 60)) % 24;
    const minutes = Math.floor((secondsTotal / 60) % 60);
    const seconds = secondsTotal % 60;
    

    yearsSpan.textContent = String(years).padStart(2, '0');
    monthsSpan.textContent = String(months).padStart(2, '0');
    daysSpan.textContent = String(days).padStart(2, '0');
    hoursSpan.textContent = String(hours).padStart(2, '0');
    minutesSpan.textContent = String(minutes).padStart(2, '0');
    secondsSpan.textContent = String(seconds).padStart(2, '0');
}

// Atualiza o marcador de tempo a cada segundo
setInterval(updateTimeMarker, 1000);

// Chama a função uma vez ao carregar a página para evitar o "00" inicial
updateTimeMarker();