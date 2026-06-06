import path from "node:path"
import {fileURLToPath} from "node:url";
import sharp from "sharp";
import fs from "node:fs";

const CHROME_ICON_SIZE_lIST = [16, 32, 48, 128]
/**
 * Base on sharp:
 * @see https://sharp.pixelplumbing.com/api-resize/
 */
const update = () => {
    const imgRoot = path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        "../public/images"
    )

    const imgPathRaw = path.resolve(imgRoot, "icon.png")
    const imgPath128 = path.resolve(imgRoot, "icon-128.png")
    const imgPath = fs.existsSync(imgPathRaw) ? imgPathRaw : imgPath128

    const iconList = [...CHROME_ICON_SIZE_lIST]
    if (imgPath === imgPath128) iconList.splice(CHROME_ICON_SIZE_lIST.indexOf(128), 1)

    const s = sharp(imgPath)
    iconList.forEach(size => {
        s.resize({width: size, height: size})
            .toFormat("png")
            .toBuffer()
            .then(b => {
                const outputImgPath = path.resolve(imgRoot, `icon.${size}.png`)
                console.log(`Write: ${outputImgPath}`)
                fs.writeFileSync(path.resolve(imgRoot, `icon-${size}.png`), b)
            })
    })
}

update()