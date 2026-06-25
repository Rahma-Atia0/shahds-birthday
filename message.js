const envelope = document.getElementById("envelope");
const typedText = document.getElementById("typedText");
const blur = document.querySelector(".blur-layer");
const music = document.getElementById("bgMusic");
const sticker = document.querySelector(".sticker");

const message = `
في يوم زي ده، مش عايزة أقولك كل سنة وإنتِ بخير وخلاص،
أنا عايزة أقولك إن وجودك في حياة أي حد حوالينك هو نعمة حقيقية مش بتتكرر 🤍

إنتِ من الناس اللي لما بيدخلوا حياة غيرهم، بيخلّوا الأيام أخف، والضحكة أصدق، والقلق أقل،
كأنك كده بتضّيّي المكان من غير ما تاخدي بالك.

بمناسبة عيد ميلادك، نفسي السنة دي تكون مختلفة…
سنة تلاقي فيها كل حاجة استنيتيها، وتوصلي فيها لحاجات كنتي فاكرة إنها بعيدة،
وتوصلي ل راحة بال وسعادة حقيقية من غير تعب.

اتمنالك ضحك كتير،  
وذكريات تفضل معاكي العمر كله، وأشخاص يفضلوا دايمًا جنبك بجد مش كلام.

كل سنة وإنتِ اقرب لكل حاجه حلوه 🤍🎀`;

let opened = false;

envelope.addEventListener("click", () => {

    if (opened) return;
    opened = true;

    envelope.classList.add("open");

    blur.style.backdropFilter = "blur(10px)";
    blur.style.background = "rgba(0,0,0,0.25)";

    music.currentTime = 48;
    music.play();
    setTimeout(() => {
    music.pause();
}, (74 - 50) * 1000);

    typedText.innerHTML = "";

    let i = 0;

    const typing = setInterval(() => {

        typedText.innerHTML += message.charAt(i);
        i++;

        if (i >= message.length) {
            clearInterval(typing);

            sticker.classList.add("show");

            setTimeout(() => {

                envelope.classList.remove("open");
                sticker.classList.remove("show");
                typedText.innerHTML = "";
                

                setTimeout(() => {
                    blur.style.backdropFilter = "blur(0px)";
                    blur.style.background = "rgba(0,0,0,0)";
                }, 500); 

                opened = false;

            }, 5000);
        }

    }, 40);
});