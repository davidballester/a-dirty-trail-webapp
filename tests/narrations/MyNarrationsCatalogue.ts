import { Narration, NarrationsCatalogue } from 'a-dirty-trail';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFilePromisified = promisify(fs.readFile);

class MyNarrationsCatalogue extends NarrationsCatalogue {
    async fetchNarrations(): Promise<Narration[]> {
        const narrationsListPath = path.join(
            __dirname,
            '../../public/narrations/list.json'
        );
        const narrationsListRaw = await readFilePromisified(
            narrationsListPath,
            { encoding: 'utf-8' }
        );
        const narrationsList = JSON.parse(narrationsListRaw);
        return narrationsList.map((title) => new Narration({ title }));
    }
}

export default MyNarrationsCatalogue;
