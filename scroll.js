window.onscroll = function () {
    let myScrollTop = document.documentElement.scrollTop;
    let myScrollHeight = document.documentElement.scrollHeight;
    let diff = myScrollHeight - myScrollTop;

    let height = document.documentElement.clientHeight;

    if ((diff - 50) < height && scrollOn == 1) {
        getPokemonData();

    }
}