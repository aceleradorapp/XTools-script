
function welcome(){
    let message = [
        'Olá, que bom ter você aqui!',
        'Seja bem-vindo!',
        'Bem-vindos ao nosso sistema!',
        'Seja bem-vindo e vamos juntos!',
        'Boa sorte e boas-vindas!',
        'É com muita alegria que hoje recebemos você!',
        'É muito bem ver nossa equipe crescer',
        'O grande segredo de uma vida boa é descobrir qual é o seu destino.',
        'Nada foi feito o sonhado mas foi bem-vindo feito tudo fosse lindo',
        'Meu desejo é que você se sinta em casa. Seja bem-vindo!',
        'O melhor de ter uma casa é poder receber pessoas queridas, como você. Seja bem-vindo!',
        'A sua presença é motivo de alegria para os nossos corações. Seja bem-vindo!',
        'Ter você aqui é a concretização de um sonho. Saiba que você poderá usar esse espaço sempre que precisar. Seja bem-vindo!',
        'Sua presença nos deixa felizes! Bem-vindo!',
        'Com sol ou chuva, todos os dias são bênçãos. Bem-vindo a um novo dia!',
    ];

    return message[Math.floor(Math.random() * message.length)];
}

var message = {
    welcome
}

module.exports = {
    message,
}