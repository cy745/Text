let result = (function () {
    let imageSources = [
        "HP_78927569.png",
        "interlude_fool.png",
        "interlude_tina.png",
        "QQ20151220-6@2x.png",
        "Plantae_70217040.png",
        "書く読む少女_76862403.png",
        "Comic_Market_66318681.png",
        "2020_JAPANTOUR_79059955.png",
        "5c4f083a8e61b874964bc65497721bdb.jpg"
    ]

    let imageAccountImageMap = {
        1914080902410: {
            avatar: imageSources[0],
            name: "李XX",
            class: "19软4班"
        },
        1914080902420: {
            avatar: imageSources[1],
            name: "罗XX",
            class: "19软4班"
        },
        1914080902421: {
            avatar: imageSources[2],
            name: "骆XX",
            class: "19软4班"
        },
        1914080902422: {
            avatar: imageSources[3],
            name: "邱XX",
            class: "19软4班"
        },
        1914080902431: {
            avatar: imageSources[4],
            name: "杨XX",
            class: "19软4班"
        },
        1914080902436: {
            avatar: imageSources[5],
            name: "郑XX",
            class: "19软件工程4班"
        },
        nobody: {
            avatar: "user-smile-line.svg",
            name: "",
            class: ""
        }
    }

    return {imageSources, imageAccountImageMap}
})()

export default result
