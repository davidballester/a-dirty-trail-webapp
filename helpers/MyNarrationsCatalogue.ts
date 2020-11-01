import { Narration, NarrationsCatalogue } from 'a-dirty-trail';

class MyNarrationsCatalogue extends NarrationsCatalogue {
    async fetchNarrations(): Promise<Narration[]> {
        const narrationTitlesResponse = await fetch('/narrations/list.json');
        const narrationTitles = await narrationTitlesResponse.json();
        return narrationTitles.map((title) => new Narration({ title }));
    }
}

export default MyNarrationsCatalogue;
