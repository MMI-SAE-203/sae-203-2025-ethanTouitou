import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// 1) récupérer la liste de tous les films triés par date de projection
export async function getFilms() {
    try {
        // Récupère tous les films de la collection "Film"
        let records = await pb.collection('Film').getFullList({
            sort: 'date_projection',
        });

        // Ajoute l'URL de l'image à chaque film
        records = records.map((film) => {
            film.imageUrl = pb.files.getURL(film, film.affiche); // `affiche` est le champ image dans le film
            return film;
        });

        console.log("Films with image URLs:", records); // Affiche les films avec les URLs

        return records;  // Retourne la liste des films avec l'URL de l'image
    } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
        return [];  // Retourne un tableau vide en cas d'erreur
    }
}

// 2) récupérer la liste de toutes les activités triées par date
export async function getActivites() {
    const records = await pb.collection('Activite').getFullList({
        sort: 'dateActivite',
    });
    return records;
}

// 3) récupérer la liste de tous les acteurs / réalisateurs triés par ordre alphabétique
export async function getInvite(id) {
    try {
        let data = await pb.collection('Invite').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.photo);
        console.log("data", data);

        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la fiche de l invité', error);
        return null;
    }
}

export async function getInvites() {
    try {
        let data = await pb.collection('Invite').getFullList();

        console.log("data", data);

        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la fiche de l invité', error);
        return null;
    }
}

// 4) récupérer les infos d'un film par son ID
export async function getFilmById(id) {
    let record = await pb.collection('Film').getOne(id);
    record.imageUrl = pb.files.getURL(record, record.affiche);
    return record;
}

// 5) récupérer les infos d'une activité par son ID
export async function getActiviteById(id) {
    const record = await pb.collection('Activite').getOne(id);
    return record;
}

// 6) récupérer les infos d'un acteur / réalisateur par son ID
export async function getInviteById(id) {
    const record = await pb.collection('Invite').getOne(id);
    return record;
}

// 7) récupérer toutes les activités d’un animateur donné par son ID
export async function getActivitesByInviteId(id) {
    const records = await pb.collection('Activite').getFullList({
        filter: `inviteActivite = '${id}'`,
    });
    return records;
}

// 8) récupérer toutes les activités d’un animateur donné par son nom
export async function getActivitesByInviteNom(nom) {
    const invites = await pb.collection('Invite').getFullList({
        filter: `activite_associes = '${nom}'`,
    });
    if (invites.length === 0) return [];
    return await getActivitesByInviteId(invites[0].id);
}

// 9) ajouter ou modifier un film, une activité ou un invité
export async function createOrUpdate(collection, data, id = null) {
    if (id) {
        const updatedRecord = await pb.collection(collection).update(id, data);
        return updatedRecord;
    } else {
        const newRecord = await pb.collection(collection).create(data);
        return newRecord;
    }
}

export async function getTowFilms() {
    try {
        // Récupérer seulement 2 films, triés par 'date_projection'
        const records = await pb.collection('Film').getList(1, 2, {
            sort: 'date_projection', // Trie par la date de projection
        });

        // Ajouter l'URL de l'image à chaque film
        const filmsWithImages = records.items.map((film) => {
            film.imageUrl = pb.files.getURL(film, film.affiche); // Récupère l'URL de l'image
            return film;
        });

        // Retourner les 2 premiers films avec l'URL de l'image
        return filmsWithImages;
    } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
        return [];
    }
}