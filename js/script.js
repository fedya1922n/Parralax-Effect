class Parallax {
    constructor(obj){
        this.bg = document.querySelector(obj.bg);
        this.clouds = document.querySelectorAll(obj.clouds);
        this.boat = document.querySelector(obj.boat);
        window.addEventListener('scroll', ()=>{this.move()})
    }
    move(){
        this.boat.style.transform = `translateX(${window.scrollY}px)`;
        this.bg.style.objectPosition = `0 ${50 + window.scrollY / 10}%`;
        this.clouds.forEach((elem)=>{
            let speed = elem.getAttribute('data-speed');
            elem.style.transform = `translateX(${window.scrollY * speed}px)`;
        });
    }
}

const parallaxImg = new Parallax({
    bg: '.header__fantasy',
    clouds: '.header__cloud',
    boat: '.header__boat'
})

class Text {
    constructor(selector){
        if (typeof selector == 'string') {
            this.text = document.querySelector(selector);            
        } else if(selector instanceof HTMLElement) {
            this.text = selector
        }
        this.fullText = this.text.innerHTML;
        this.text.innerHTML = '';
        this.write();
    }
    write(x=0){
        this.text.innerHTML += this.fullText[x]
        x++;
        if(x < this.fullText.length){
            setTimeout(() => {
               this.write(x) 
            }, 200);
        }
    }
}

let a = document.querySelector('.header__title');
// const textH1 = new Text('.header__title');
const textH1 = new Text(a);

class ParallaxMove {
    constructor(selector){
        this.balls = document.querySelectorAll(selector);
        window.addEventListener('mousemove', (e)=>{
            this.move(e)
        })
    }
    move(event){
        this.balls.forEach((elem)=>{
            let speed = elem.getAttribute('data-speed');
            let x = (event.x * speed) / 50
            let y = (event.y * speed) / 50
            elem.style.transform = `translate(${x}px, ${y}px)`
        })
    }
}

const ballsMove = new ParallaxMove('.parallax__ball');

class Timer {
    constructor(obj){
        this.nums = document.querySelectorAll(obj.nums);
        this.section = document.querySelector(obj.sect);
        this.state = true;
        this.nums.forEach((elem)=>{
            elem.innerHTML = 0;
        })
        window.addEventListener('scroll', ()=>{ this.scrollTimer()})
    }
    timerSet() {
        this.nums.forEach((elem)=>{
            let count = elem.getAttribute('data-num')
            function timer(x=0) {
                elem.innerHTML = x;
                x++;
                if (x <= count) {
                    setTimeout(() => {
                        timer(x)
                    }, 10);                    
                }
            }
            timer()
        })
    }
    scrollTimer(){
        // console.log(scrollY); // спустился
        // console.log(innerHeight); // высота видимой части
        // console.log(this.section.offsetHeight); // высота секции
        // console.log(this.section.offsetTop); // расстояние секции
        let top = scrollY + innerHeight - this.section.offsetHeight / 2
        if (top > this.section.offsetTop && this.state) {
            this.timerSet()
            this.state = false;
        }
    }
}

const cards = new Timer({
    nums: '.timer__num',
    sect: '.timer'
})


class Bubble {
    constructor(select){
        this.links = document.querySelectorAll(select);
        this.links.forEach((elem)=>{
            elem.addEventListener('mousemove', (event)=>{
                this.show(event, elem)
            })
        })
    }
    show(e, btn){
        const x = e.pageX - btn.offsetLeft;
        const y = e.pageY - btn.offsetTop;
        const span = btn.querySelector('span');
        span.style.left = x+'px'
        span.style.top = y+'px'
    }
}

const bubbleLink = new Bubble('.timer__btn')

class Rotate3D {
    constructor(select){
        this.cards = document.querySelectorAll(select);
        this.cards.forEach((elem)=>{
            elem.addEventListener('mousemove', (event)=>{
                this.rotate(event, elem)
            })
        })
        this.cards.forEach((elem)=>{
            elem.addEventListener('mouseout', ()=>{
                this.rotateNone(elem)
            })
        })

    }
    rotate(e, card){
        const item = card.querySelector('.card__item');
        let halfHeight = item.offsetHeight / 2;
        let rotateX = (halfHeight - e.offsetY) / halfHeight * 30
        item.style.transform = `rotateX(${rotateX}deg)`;

        let halfWidth = item.offsetWidth / 2;
        let rotateY = (halfWidth - e.offsetX) / halfWidth * 30
        item.style.transform = `rotateY(${-rotateY}deg) rotateX(${rotateX}deg)`;
        
    }
    rotateNone(card){
        const item = card.querySelector('.card__item');
        item.style.transform = `rotate(0)`;
    }
}

const card3D = new Rotate3D('.card')

class Scroll {
    constructor(select){
        this.section = document.querySelectorAll(select);
        window.addEventListener("scroll", ()=>{
            this.section.forEach((elem)=>{
                this.fadeRight(elem)
            })
        })
    }
    fadeRight(sect){
        const cards = sect.querySelectorAll('.fade-right');
        let top = scrollY + innerHeight - sect.offsetHeight / 2
        cards.forEach((elem)=>{
            let speed = elem.getAttribute("data-speed");
            elem.style.transition = speed + "ms";
            if (top > sect.offsetTop) {
                elem.classList.add("active")
            } else {
                elem.classList.remove("active")
            }
        })
    }
}
const scrollMove = new Scroll(".scroll")
console.log(scrollMove);
