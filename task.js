const path = require("path");
const fs = require("fs").promises;
const {data, config} = require("./data")
async function genereteFileStruct(data, dirc) {
   try {
       for (let i of Object.values(dirc)) {
            await fs.mkdir(path.join(__dirname, i))
            i = i.split('.').join("")
            for (let j of data) {
                if (j.type == 'file'){
                    await fs.writeFile(path.join(__dirname + i, j.name +`.${j.ext}`), j.content)
                }
                if (j.type == 'folder') {
                    genereteFileStruct(j.child, {path: `${i}`+"/" + j.name})
                }
            }
        }
   } catch (error) {
    console.log(error+"");
   }
}
genereteFileStruct(data, config)