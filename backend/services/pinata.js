const Item = require('../models/itemModel.js');
const fs = require('fs');
const path = require('path');
const stream = require('node:stream'); 

const pinnie = require("pinata");

const pinata = new pinnie.PinataSDK({
  pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiZDczNmFjZC01ZTEwLTQ5YWMtODk0MC04YWM3YmNlNzkwYTYiLCJlbWFpbCI6ImpqNzc0QGNvcm5lbGwuZWR1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjVkZTU4OTY1YjVhNDliYjA2Mjg4Iiwic2NvcGVkS2V5U2VjcmV0IjoiMjIwZjk0NzQxNTY0YTAzNDdkMTc0NjA0NGFjODM5ZDY2NmI2ZDQzMTAzMTRkYTI2NzkzMzMxM2U1ZTU4MTIxMCIsImV4cCI6MTc1OTY3MTk4Mn0.ydqCY-ifBeS14ldyDO9KJ2ELQaVDR8cqE_bai-yUajM",
  pinataGateway: "gray-elegant-coral-798.mypinata.cloud",
});

async function listPhotos() {
    try {
        const data = await pinata.files.list();
        // console.log(data);
        // console.log(data.files);
        // console.log("--------------------------------");

        let newList = [];
        for (const item of data.files) {
            const cid = item.cid;
            const name = item.name;
            if (cid != "pending" && (name.includes("top") || name.includes("bottom") || name.includes("shoes"))) {
                try {
                    const itemData = await pinata.gateways.get(
                        cid,
                    );
                    // const mapData = JSON.parse(itemData);
                    // console.log(itemData.data);
                    const stream = await itemData.data.stream();

                    const outputFilePath = path.join(__dirname, `/${cid}.jpg`);
                    const fileStream = fs.createWriteStream(outputFilePath);

                    stream.pipe(fileStream);
                    
                    fileStream.on('finish', () => {
                        console.log(`File saved successfully as: ${outputFilePath}`);
                    });

                    // const buffer = Buffer.from(array);
                    console.log('Blob content:', fileStream);
                    // const mapData = JSON.parse(buffer.toString());
                    // console.log(res);
                    // newList.push(new Item(mapData["type"], mapData["hsl"][0], mapData["hsl"][1], mapData["hsl"][2], mapData["formality"], mapData["weather"], cid, mapData["style"], mapData["name"]));
                    // console.log(newList);
                    // console.log(cid);
                } catch (error) {
                    console.log(error);
                }
            }
            // console.log(newList);
        }
        console.log(newList);
        return newList;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function pinItem(item, file) {
    try {
        const contentJson = {
            type: item.getType(),
            hsl: item.getHsl(),
            formality: item.getFormality(),
            weather: item.getWeather(),
            style: item.getStyle(),
            name: item.getName(),
        };
        console.log(contentJson);
        const name = item.getName();
        // const file = new File([JSON.stringify(contentJson)], name, { type: "text/plain" });
        const upload = await pinata.upload.json(contentJson);
        console.log(upload);

        return upload;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function listPinnedItems() {
    try {
        const data = await pinata.files.list().name("data.json");
        // console.log(data);
        // console.log(data.files);
        // console.log("--------------------------------");

        let newList = [];
        for (const item of data.files) {
            const cid = item.cid;
            if (cid != "pending") {
                try {
                    const itemData = await pinata.gateways.get(
                        cid,
                    );
                    // const mapData = JSON.parse(itemData);
                    // console.log(itemData);
                    const array = await itemData.data.arrayBuffer()
                    const buffer = Buffer.from(array);
                    // console.log('Buffer content:', buffer.toString());
                    const mapData = JSON.parse(buffer.toString());
                    // console.log(res);
                    newList.push(new Item(mapData["type"], mapData["hsl"][0], mapData["hsl"][1], mapData["hsl"][2], mapData["formality"], mapData["weather"], cid, mapData["style"], mapData["name"]));
                    // console.log(newList);
                    // console.log(cid);
                } catch (error) {
                    console.log(error);
                }
            }
            // console.log(newList);
        }
        // for (let i = 0; i < list.length; i++) {
        //     const cid = list[i].cid;
        //     if (cid != "pending") {
        //         try {
        //             const data = await pinata.gateways.get(
        //                 "bafybeibo5zcqeorhqxczodrx52rn7byyrwfvwthz5dspnjlbkd7zkugefi",
        //             );
        //             const mapData = JSON.parse(data);
        //             console.log(mapData);
        //             newList.push(Item(mapData["type"] ,mapData["hsl"], mapData["formality"], mapData["weather"], cid, mapData["style"], list[i].name));
        //             console.log(newList);
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     }
        // }
        console.log(newList);
        return newList;
    } catch (error) {
        console.log(error);
        return error;
    }
}



module.exports = {
    pinItem: pinItem,
    listPinnedItems: listPinnedItems,
    listPhotos: listPhotos,
};