// array corresponding to the image files in pinata. 
// ideally, gemini would process the items first then hand the image to pinata // input the other info into this array but we make do lol
const Item = require('../models/itemModel.js');

const arrayOfClothes = [
    // (type, h, s, l, formality, weather, pinataCid, style, name) 
    new Item('bottom', 0.60, 0.03, 0.88, 0.1, 0.3, 
        'bafybeiczyry5hvycdhuocmrjhvgnpashe3g4jn266kspa4l3tju4sbpugy',
        'minimal', 'bottom4'
    ),
    new Item('bottom', 0.83, 0.68, 0.38, 0.1, 0.8, 
        'bafkreidlj7sgean46ig5w4boocq7gox7lhzedfeyr76kuf44xb5ptgiiqa',
        'street', 'bottom3'
    ),
    new Item('bottom', 0.90, 0.09, 0.89, 0.9, 0.5, 
        'bafkreiba3rsv2njc2qw6ttdtphhgqtidnfvh3reo6uth6gyoz4ux7ozoiq',
        'fancy', 'bottom2'
    ),
    new Item('bottom', 0.12, 0.32, 0.63, 0.3, 0.9, 
        'bafybeidisdrvzl4kgbvufjdrtboa6rijbfncbmvslfk6b3nhakftdco2lq',
        'street', 'bottom1'
    ),

    new Item('top', 0.20, 0.13, 0.81, 0.1, 0.9, 
        'bafkreihgw37p7f6s2oxws2ow323mz5a6666at3xmm2ugfmfgovdpdbaxcm',
        'minimal', 'top5'
    ),
    new Item('top', 0.01, 0.02, 0.94, 0.3, 0.1, 
        'bafkreif2lpm3yil66givz4cnyuj5wg2jjkrbq4ujh2dypcbbjp6gjp6wxi',
        'street', 'top4'
    ),
    new Item('top', 0.23, 0.02, 0.82, 0.2, 0.7, 
        'bafkreiawt45cs5mrzizu7hojhia62x5zdmoh7kosy3swhytla6abwdytea',
        'street', 'top3'
    ),
    new Item('top', 0.85, 0.27, 0.27, 0.2, 0.6, 
        'bafkreibaxbcyxjki5fon7urblklbhkfvazukuotrcb7rklgwbxija7hkfa',
        'street', 'top2'
    ),
    new Item('top', 0.09, 0.62, 0.04, 0.9, 0.3, 
        'bafkreibhug7qcnwd4eoucn3wsj5566hdmbzbt2fx7oto56rimbyel3q2ra',
        'street', 'top1'
    ),
]

module.exports = {arrayOfClothes};

// [
//     {
//       name: 'bottom4.png',
//       cid: 'bafybeiczyry5hvycdhuocmrjhvgnpashe3g4jn266kspa4l3tju4sbpugy',
//       path: 'C:\\Users\\iames\\projects\\brh-backend\\backend\\services\\bafybeiczyry5hvycdhuocmrjhvgnpashe3g4jn266kspa4l3tju4sbpugy.jpg'
//     },
//     {
//       name: 'bottom3.png',
//       cid: 'bafkreidlj7sgean46ig5w4boocq7gox7lhzedfeyr76kuf44xb5ptgiiqa',
//       path: 'C:\\Users\\iames\\projects\\brh-backend\\backend\\services\\bafkreidlj7sgean46ig5w4boocq7gox7lhzedfeyr76kuf44xb5ptgiiqa.jpg'
//     },
//     {
//       name: 'bottom2.png',
//       cid: 'bafkreiba3rsv2njc2qw6ttdtphhgqtidnfvh3reo6uth6gyoz4ux7ozoiq',
//       path: 'C:\\Users\\iames\\projects\\brh-backend\\backend\\services\\bafkreiba3rsv2njc2qw6ttdtphhgqtidnfvh3reo6uth6gyoz4ux7ozoiq.jpg'
//     },
//     {
//       name: 'bottom1.png',
//       cid: 'bafybeidisdrvzl4kgbvufjdrtboa6rijbfncbmvslfk6b3nhakftdco2lq',
//       path: 'C:\\Users\\iames\\projects\\brh-backend\\backend\\services\\bafybeidisdrvzl4kgbvufjdrtboa6rijbfncbmvslfk6b3nhakftdco2lq.jpg'
//     },
//     {
//       name: 'top5.png',
//       cid: 'bafkreihgw37p7f6s2oxws2ow323mz5a6666at3xmm2ugfmfgovdpdbaxcm',
//       path: 'C:\\Users\\iames\\projects\\brh-backend\\backend\\services\\bafkreihgw37p7f6s2oxws2ow323mz5a6666at3xmm2ugfmfgovdpdbaxcm.jpg'
//     },
//     {
//       name: 'top4.png',
//       cid: 'bafkreif2lpm3yil66givz4cnyuj5wg2jjkrbq4ujh2dypcbbjp6gjp6wxi',
//       path: 'C:\\Users\\iames\\projects\\brh-backend\\backend\\services\\bafkreif2lpm3yil66givz4cnyuj5wg2jjkrbq4ujh2dypcbbjp6gjp6wxi.jpg'
//     },
//     {
//       name: 'top3.png',
//       cid: 'bafkreiawt45cs5mrzizu7hojhia62x5zdmoh7kosy3swhytla6abwdytea',
//       path: 'C:\\Users\\iames\\projects\\brh-backend\\backend\\services\\bafkreiawt45cs5mrzizu7hojhia62x5zdmoh7kosy3swhytla6abwdytea.jpg'
//     },
//     {
//       name: 'top2.png',
//       cid: 'bafkreibaxbcyxjki5fon7urblklbhkfvazukuotrcb7rklgwbxija7hkfa',
//       path: 'C:\\Users\\iames\\projects\\brh-backend\\backend\\services\\bafkreibaxbcyxjki5fon7urblklbhkfvazukuotrcb7rklgwbxija7hkfa.jpg'
//     },
//     {
//       name: 'top1.png',
//       cid: 'bafkreibhug7qcnwd4eoucn3wsj5566hdmbzbt2fx7oto56rimbyel3q2ra',
//       path: 'C:\\Users\\iames\\projects\\brh-backend\\backend\\services\\bafkreibhug7qcnwd4eoucn3wsj5566hdmbzbt2fx7oto56rimbyel3q2ra.jpg'
//     }
//   ]
  