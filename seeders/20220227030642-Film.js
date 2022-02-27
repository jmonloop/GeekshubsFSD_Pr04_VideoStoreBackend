'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Films', [
      {
        "title": "Guerrilla: The Taking of Patty Hearst",
        "synopsis": "a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam",
        "adult": true,
        "popularity": 2.5,
        "image": "http://dummyimage.com/109x100.png/cc0000/ffffff",
        "createdAt": "2022-01-08 10:43:36",
        "updatedAt": "2021-04-28 20:50:30"
      }, {
        "title": "Blood Diamond",
        "synopsis": "est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et",
        "adult": false,
        "popularity": 4.7,
        "image": "http://dummyimage.com/100x100.png/cc0000/ffffff",
        "createdAt": "2021-10-10 18:43:03",
        "updatedAt": "2021-04-30 18:16:22"
      }, {
        "title": "Command Performance",
        "synopsis": "dui proin leo odio porttitor id consequat in consequat ut",
        "adult": true,
        "popularity": 0.7,
        "image": "http://dummyimage.com/194x100.png/dddddd/000000",
        "createdAt": "2021-10-28 16:39:56",
        "updatedAt": "2021-09-02 14:07:42"
      }, {
        "title": "South Pacific",
        "synopsis": "rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis",
        "adult": false,
        "popularity": 0.6,
        "image": "http://dummyimage.com/143x100.png/5fa2dd/ffffff",
        "createdAt": "2021-06-17 03:45:34",
        "updatedAt": "2021-10-24 09:59:29"
      }, {
        "title": "Turn It Up",
        "synopsis": "a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla",
        "adult": false,
        "popularity": 6.1,
        "image": "http://dummyimage.com/247x100.png/dddddd/000000",
        "createdAt": "2022-02-10 08:51:27",
        "updatedAt": "2021-11-08 03:03:46"
      }, {
        "title": "Long Day's Journey Into Night",
        "synopsis": "lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est",
        "adult": true,
        "popularity": 8.0,
        "image": "http://dummyimage.com/237x100.png/5fa2dd/ffffff",
        "createdAt": "2021-07-01 14:04:15",
        "updatedAt": "2021-10-13 06:50:48"
      }, {
        "title": "Tough Guise: Violence, Media & the Crisis in Masculinity",
        "synopsis": "in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et",
        "adult": false,
        "popularity": 3.1,
        "image": "http://dummyimage.com/198x100.png/dddddd/000000",
        "createdAt": "2021-03-18 01:05:55",
        "updatedAt": "2021-02-23 07:56:59"
      }, {
        "title": "Willow Tree, The (Beed-e majnoon)",
        "synopsis": "quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla",
        "adult": true,
        "popularity": 7.5,
        "image": "http://dummyimage.com/135x100.png/ff4444/ffffff",
        "createdAt": "2021-10-24 19:24:01",
        "updatedAt": "2021-03-16 16:50:14"
      }, {
        "title": "Liberation of L.B. Jones, The",
        "synopsis": "eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam",
        "adult": true,
        "popularity": 5.9,
        "image": "http://dummyimage.com/135x100.png/cc0000/ffffff",
        "createdAt": "2022-01-06 16:43:33",
        "updatedAt": "2021-06-28 18:10:04"
      }, {
        "title": "Mikra Anglia",
        "synopsis": "non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi",
        "adult": false,
        "popularity": 6.6,
        "image": "http://dummyimage.com/221x100.png/5fa2dd/ffffff",
        "createdAt": "2021-05-07 05:56:47",
        "updatedAt": "2021-08-17 11:18:06"
      }, {
        "title": "Play Dirty",
        "synopsis": "ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus",
        "adult": true,
        "popularity": 4.0,
        "image": "http://dummyimage.com/139x100.png/ff4444/ffffff",
        "createdAt": "2021-05-12 06:24:23",
        "updatedAt": "2021-12-21 07:02:09"
      }, {
        "title": "Dodge City",
        "synopsis": "sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat",
        "adult": false,
        "popularity": 3.2,
        "image": "http://dummyimage.com/174x100.png/5fa2dd/ffffff",
        "createdAt": "2021-08-13 12:48:25",
        "updatedAt": "2021-08-17 15:12:18"
      }, {
        "title": "Superclásico",
        "synopsis": "sagittis nam congue risus semper porta volutpat quam pede lobortis ligula",
        "adult": true,
        "popularity": 6.4,
        "image": "http://dummyimage.com/244x100.png/dddddd/000000",
        "createdAt": "2021-07-20 00:07:56",
        "updatedAt": "2021-06-02 17:48:53"
      }, {
        "title": "For the Love of Movies",
        "synopsis": "id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non",
        "adult": false,
        "popularity": 5.0,
        "image": "http://dummyimage.com/155x100.png/dddddd/000000",
        "createdAt": "2021-11-17 23:44:56",
        "updatedAt": "2021-08-15 02:26:52"
      }, {
        "title": "Direct Action",
        "synopsis": "nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet",
        "adult": true,
        "popularity": 1.2,
        "image": "http://dummyimage.com/237x100.png/dddddd/000000",
        "createdAt": "2021-09-29 20:42:57",
        "updatedAt": "2021-06-17 05:56:33"
      }, {
        "title": "Northwest Passage",
        "synopsis": "in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum",
        "adult": true,
        "popularity": 8.2,
        "image": "http://dummyimage.com/217x100.png/dddddd/000000",
        "createdAt": "2022-01-29 08:36:52",
        "updatedAt": "2021-03-26 01:21:36"
      }, {
        "title": "Profound Desires of the Gods (Kamigami no fukaki yokubo) ",
        "synopsis": "proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac",
        "adult": true,
        "popularity": 3.1,
        "image": "http://dummyimage.com/140x100.png/dddddd/000000",
        "createdAt": "2021-10-29 16:49:30",
        "updatedAt": "2021-05-15 08:34:44"
      }, {
        "title": "Prime of Miss Jean Brodie, The",
        "synopsis": "iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa",
        "adult": false,
        "popularity": 0.5,
        "image": "http://dummyimage.com/152x100.png/5fa2dd/ffffff",
        "createdAt": "2021-05-24 22:25:02",
        "updatedAt": "2021-11-13 03:04:10"
      }, {
        "title": "Witching and Bitching (Brujas de Zugarramurdi, Las)",
        "synopsis": "dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis",
        "adult": false,
        "popularity": 9.1,
        "image": "http://dummyimage.com/222x100.png/ff4444/ffffff",
        "createdAt": "2021-12-15 10:08:37",
        "updatedAt": "2021-03-26 02:11:54"
      }, {
        "title": "Jerry Springer: The Opera",
        "synopsis": "sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis",
        "adult": true,
        "popularity": 7.2,
        "image": "http://dummyimage.com/184x100.png/dddddd/000000",
        "createdAt": "2021-09-10 07:15:24",
        "updatedAt": "2021-07-14 09:22:28"
      }, {
        "title": "Hellsinki (Rööperi)",
        "synopsis": "augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula",
        "adult": false,
        "popularity": 3.1,
        "image": "http://dummyimage.com/240x100.png/dddddd/000000",
        "createdAt": "2021-11-30 12:59:30",
        "updatedAt": "2021-07-24 07:14:19"
      }, {
        "title": "Day & Night",
        "synopsis": "eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam",
        "adult": true,
        "popularity": 6.2,
        "image": "http://dummyimage.com/111x100.png/ff4444/ffffff",
        "createdAt": "2021-09-14 00:50:49",
        "updatedAt": "2022-02-07 08:06:26"
      }, {
        "title": "Seven Billiard Tables (Siete mesas de billar francés)",
        "synopsis": "vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla",
        "adult": true,
        "popularity": 0.0,
        "image": "http://dummyimage.com/112x100.png/cc0000/ffffff",
        "createdAt": "2021-06-23 12:24:49",
        "updatedAt": "2022-02-09 20:34:08"
      }, {
        "title": "Today's Special",
        "synopsis": "nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis",
        "adult": true,
        "popularity": 5.9,
        "image": "http://dummyimage.com/206x100.png/cc0000/ffffff",
        "createdAt": "2021-07-23 00:54:57",
        "updatedAt": "2021-06-26 21:04:05"
      }, {
        "title": "Alien Nation: Millennium",
        "synopsis": "nisl duis bibendum felis sed interdum venenatis turpis enim blandit",
        "adult": false,
        "popularity": 9.5,
        "image": "http://dummyimage.com/237x100.png/ff4444/ffffff",
        "createdAt": "2021-03-05 04:46:30",
        "updatedAt": "2021-03-22 17:43:04"
      }, {
        "title": "Square, The",
        "synopsis": "vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede",
        "adult": true,
        "popularity": 3.8,
        "image": "http://dummyimage.com/123x100.png/5fa2dd/ffffff",
        "createdAt": "2021-03-28 18:05:22",
        "updatedAt": "2021-11-02 08:52:19"
      }, {
        "title": "Bride Comes Home, The",
        "synopsis": "ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit",
        "adult": false,
        "popularity": 0.8,
        "image": "http://dummyimage.com/247x100.png/ff4444/ffffff",
        "createdAt": "2021-09-01 07:59:10",
        "updatedAt": "2022-01-11 07:34:55"
      }, {
        "title": "The Chaos Class Failed the Class",
        "synopsis": "dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam",
        "adult": true,
        "popularity": 4.2,
        "image": "http://dummyimage.com/170x100.png/cc0000/ffffff",
        "createdAt": "2021-11-28 05:22:25",
        "updatedAt": "2021-05-06 12:41:02"
      }, {
        "title": "Frankenfish",
        "synopsis": "non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed",
        "adult": true,
        "popularity": 9.7,
        "image": "http://dummyimage.com/150x100.png/ff4444/ffffff",
        "createdAt": "2021-09-21 10:58:47",
        "updatedAt": "2021-03-28 03:50:06"
      }, {
        "title": "Girl with the Dragon Tattoo, The (Män som hatar kvinnor)",
        "synopsis": "odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi",
        "adult": false,
        "popularity": 5.6,
        "image": "http://dummyimage.com/162x100.png/ff4444/ffffff",
        "createdAt": "2021-10-25 09:35:22",
        "updatedAt": "2021-05-26 05:07:50"
      }, {
        "title": "The Lunchbox",
        "synopsis": "nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris",
        "adult": true,
        "popularity": 6.4,
        "image": "http://dummyimage.com/216x100.png/5fa2dd/ffffff",
        "createdAt": "2021-12-28 05:16:16",
        "updatedAt": "2021-05-06 15:02:48"
      }, {
        "title": "Suture",
        "synopsis": "eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices",
        "adult": true,
        "popularity": 8.0,
        "image": "http://dummyimage.com/244x100.png/5fa2dd/ffffff",
        "createdAt": "2022-02-02 03:29:41",
        "updatedAt": "2021-11-14 23:51:02"
      }, {
        "title": "Hellboy",
        "synopsis": "ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing",
        "adult": false,
        "popularity": 5.6,
        "image": "http://dummyimage.com/192x100.png/ff4444/ffffff",
        "createdAt": "2021-11-14 18:29:58",
        "updatedAt": "2021-04-17 04:54:39"
      }, {
        "title": "Mooring, The",
        "synopsis": "lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante",
        "adult": false,
        "popularity": 0.6,
        "image": "http://dummyimage.com/163x100.png/ff4444/ffffff",
        "createdAt": "2021-05-09 02:08:35",
        "updatedAt": "2021-05-27 03:42:29"
      }, {
        "title": "Justice League: War",
        "synopsis": "consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit",
        "adult": false,
        "popularity": 2.0,
        "image": "http://dummyimage.com/172x100.png/cc0000/ffffff",
        "createdAt": "2021-08-05 19:58:52",
        "updatedAt": "2021-12-15 07:03:40"
      }, {
        "title": "Forget Me Not",
        "synopsis": "volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper",
        "adult": true,
        "popularity": 1.6,
        "image": "http://dummyimage.com/215x100.png/5fa2dd/ffffff",
        "createdAt": "2021-11-08 10:44:33",
        "updatedAt": "2021-09-30 19:29:15"
      }, {
        "title": "Nine Dead",
        "synopsis": "consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam",
        "adult": true,
        "popularity": 9.5,
        "image": "http://dummyimage.com/200x100.png/cc0000/ffffff",
        "createdAt": "2021-10-13 00:13:44",
        "updatedAt": "2021-10-17 00:36:02"
      }, {
        "title": "Lost Christmas",
        "synopsis": "volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh",
        "adult": true,
        "popularity": 4.2,
        "image": "http://dummyimage.com/145x100.png/dddddd/000000",
        "createdAt": "2021-06-28 07:02:06",
        "updatedAt": "2021-03-15 05:40:02"
      }, {
        "title": "There Goes My Heart",
        "synopsis": "vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus",
        "adult": false,
        "popularity": 9.9,
        "image": "http://dummyimage.com/129x100.png/dddddd/000000",
        "createdAt": "2021-12-17 02:51:42",
        "updatedAt": "2021-03-14 19:24:45"
      }, {
        "title": "Duets",
        "synopsis": "volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id",
        "adult": true,
        "popularity": 5.9,
        "image": "http://dummyimage.com/200x100.png/dddddd/000000",
        "createdAt": "2021-10-14 11:41:53",
        "updatedAt": "2021-03-13 12:51:54"
      }, {
        "title": "Three Men and a Little Lady",
        "synopsis": "platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent",
        "adult": false,
        "popularity": 2.1,
        "image": "http://dummyimage.com/109x100.png/dddddd/000000",
        "createdAt": "2021-10-12 10:14:14",
        "updatedAt": "2021-02-25 13:12:07"
      }, {
        "title": "String, The (Le fil)",
        "synopsis": "sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus",
        "adult": false,
        "popularity": 1.5,
        "image": "http://dummyimage.com/133x100.png/5fa2dd/ffffff",
        "createdAt": "2021-08-10 22:51:20",
        "updatedAt": "2021-10-30 10:06:54"
      }, {
        "title": "Road to Ruin, The",
        "synopsis": "nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo",
        "adult": false,
        "popularity": 0.7,
        "image": "http://dummyimage.com/178x100.png/dddddd/000000",
        "createdAt": "2021-07-14 15:15:46",
        "updatedAt": "2021-07-20 12:04:11"
      }, {
        "title": "My Life in Orange (Sommer in Orange)",
        "synopsis": "purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien",
        "adult": false,
        "popularity": 8.5,
        "image": "http://dummyimage.com/149x100.png/dddddd/000000",
        "createdAt": "2021-05-03 02:39:29",
        "updatedAt": "2021-09-29 12:14:00"
      }, {
        "title": "Movie Movie",
        "synopsis": "vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam",
        "adult": true,
        "popularity": 3.3,
        "image": "http://dummyimage.com/126x100.png/dddddd/000000",
        "createdAt": "2021-08-11 20:37:51",
        "updatedAt": "2021-11-26 20:13:09"
      }, {
        "title": "Shadows in an Empty Room",
        "synopsis": "malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue",
        "adult": false,
        "popularity": 3.8,
        "image": "http://dummyimage.com/145x100.png/cc0000/ffffff",
        "createdAt": "2021-09-23 03:47:03",
        "updatedAt": "2021-05-18 15:45:30"
      }, {
        "title": "Moon Man",
        "synopsis": "luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris",
        "adult": true,
        "popularity": 9.9,
        "image": "http://dummyimage.com/122x100.png/5fa2dd/ffffff",
        "createdAt": "2021-09-18 16:10:33",
        "updatedAt": "2021-07-15 02:50:42"
      }, {
        "title": "Things Change",
        "synopsis": "suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in",
        "adult": true,
        "popularity": 0.8,
        "image": "http://dummyimage.com/188x100.png/dddddd/000000",
        "createdAt": "2021-07-15 16:34:56",
        "updatedAt": "2021-12-24 13:23:44"
      }, {
        "title": "Lotte Reiniger: Homage to the Inventor of the Silhouette Film",
        "synopsis": "arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in",
        "adult": true,
        "popularity": 6.0,
        "image": "http://dummyimage.com/126x100.png/ff4444/ffffff",
        "createdAt": "2021-03-10 18:08:27",
        "updatedAt": "2021-06-23 09:43:08"
      }, {
        "title": "Scalphunters, The",
        "synopsis": "aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non",
        "adult": false,
        "popularity": 0.5,
        "image": "http://dummyimage.com/172x100.png/ff4444/ffffff",
        "createdAt": "2021-10-23 18:07:38",
        "updatedAt": "2021-06-29 05:17:43"
      }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
