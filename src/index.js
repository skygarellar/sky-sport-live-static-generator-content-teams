const next = require('next');
const dev = process.env.NODE_ENV !== "production";
const appNext = next({ dev });

const extractStaticContent = (content) => {
    let staticContent;
    const regex = /<div id="__next">((.|\n)*)<\/div>/gm;
    while ((m = regex.exec(content)) !== null) {

        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach((match, groupIndex) => {
            if (groupIndex === 1) {
                staticContent = match;
            }
        });
    }
    return staticContent;
};

const staticContentGeneratorTeams = {
    get: async (req, res, params) => {
        try {
            await appNext.prepare();
            const nextContent = await appNext.renderToHTML(req, res, '/', params)
            return extractStaticContent(nextContent);
        }
        catch (error) {
            return;
        }
    }
}

export default staticContentGeneratorTeams;