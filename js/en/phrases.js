// Phrases de la vie courante : pour parler (écouter, répéter), écrire (traduire) et la dictée.
// Une ligne : anglais (le modèle, puis d'autres traductions acceptées après |) ; français
// L'identifiant est « groupe.numéro de ligne » : n'ajouter de phrases qu'à la fin d'un groupe.

const G = (id, name, level, text) => ({
  id, name, level,
  items: text.trim().split('\n').map((l, i) => {
    const [en, fr] = l.split(';').map((x) => x.trim());
    return { id: `${id}.${i + 1}`, en, fr, group: id };
  }),
});

export const PHRASE_GROUPS = [
G('intro', 'Se présenter', 'A1', `
Hi, I'm Alex. Nice to meet you.|Hello, I'm Alex. Nice to meet you.|Hi, my name is Alex. Nice to meet you. ; Salut, je suis Alex. Enchanté.
I'm from the south of France. ; Je viens du sud de la France.
I'm twenty years old.|I am 20 years old.|I'm 20. ; J'ai vingt ans.
I'm a computer science student.|I study computer science.|I'm studying computer science. ; Je suis étudiant en informatique.
I live in a small flat with a friend.|I live in a small apartment with a friend. ; J'habite dans un petit appartement avec un ami.
In my free time, I play video games and I listen to music. ; Pendant mon temps libre, je joue aux jeux vidéo et j'écoute de la musique.
I've been learning English for a few months.|I have been studying English for a few months. ; J'apprends l'anglais depuis quelques mois.
I have one brother and two sisters.|I've got one brother and two sisters. ; J'ai un frère et deux sœurs.
What do you do for a living?|What do you do? ; Qu'est-ce que tu fais dans la vie ?
Where are you from?|Where do you come from? ; D'où viens-tu ?
`),
G('smalltalk', 'Discuter', 'A1', `
How are you? — I'm fine, thanks. And you?|How are you? — I'm good, thanks. And you? ; Comment ça va ? — Bien, merci. Et toi ?
What's the weather like today?|What is the weather like today? ; Quel temps fait-il aujourd'hui ?
What did you do at the weekend?|What did you do last weekend?|What did you do on the weekend? ; Qu'est-ce que tu as fait ce week-end ?
Have you seen any good films lately?|Have you seen any good movies lately?|Have you seen any good films recently? ; Tu as vu de bons films récemment ?
I'm really looking forward to the holidays.|I'm really looking forward to the vacation. ; J'ai vraiment hâte d'être en vacances.
That sounds great!|That sounds amazing! ; Ça a l'air génial !
I know what you mean.|I see what you mean. ; Je vois ce que tu veux dire.
It's been a long time! How have you been?|Long time no see! How have you been? ; Ça fait longtemps ! Comment tu vas depuis ?
Let's keep in touch.|Let's stay in touch. ; Restons en contact.
I have to go now. See you soon!|I've got to go now. See you soon! ; Je dois y aller. À bientôt !
`),
G('food', 'Au restaurant et au café', 'A2', `
Could I have a coffee, please?|Can I have a coffee, please?|I'd like a coffee, please. ; Je pourrais avoir un café, s'il vous plaît ?
A table for two, please. ; Une table pour deux, s'il vous plaît.
Can we see the menu, please?|Could we see the menu, please?|Could we have the menu, please? ; On peut voir la carte, s'il vous plaît ?
I'd like the chicken with rice.|I would like the chicken with rice.|I'll have the chicken with rice. ; Je voudrais le poulet avec du riz.
Is there anything vegetarian?|Do you have anything vegetarian?|Do you have any vegetarian dishes? ; Est-ce qu'il y a quelque chose de végétarien ?
I'm allergic to nuts.|I have a nut allergy. ; Je suis allergique aux fruits à coque.
Could we have the bill, please?|Can we have the bill, please?|Could we have the check, please?|Can we have the check, please? ; On pourrait avoir l'addition, s'il vous plaît ?
Can I pay by card?|Can I pay with my card?|Do you take cards? ; Je peux payer par carte ?
It was delicious, thank you.|It was delicious, thanks. ; C'était délicieux, merci.
Is service included?|Is the tip included? ; Le service est compris ?
`),
G('directions', 'Demander son chemin', 'A2', `
Excuse me, where is the nearest station?|Excuse me, where's the nearest station? ; Excusez-moi, où est la gare la plus proche ?
How do I get to the city centre?|How can I get to the city centre?|How do I get to the city center?|How do I get to downtown? ; Comment je vais au centre-ville ?
Is it far from here?|Is it far? ; C'est loin d'ici ?
Go straight on and turn left at the traffic lights.|Go straight ahead and turn left at the traffic lights.|Go straight and turn left at the lights. ; Allez tout droit et tournez à gauche aux feux.
It's on your right, next to the bank.|It is on your right, next to the bank. ; C'est sur votre droite, à côté de la banque.
It's about ten minutes on foot.|It's about a ten-minute walk.|It takes about ten minutes on foot. ; C'est à environ dix minutes à pied.
Could you show me on the map?|Can you show me on the map? ; Vous pourriez me montrer sur la carte ?
I think I'm lost.|I think I am lost. ; Je crois que je suis perdu.
Which bus goes to the airport?|What bus goes to the airport? ; Quel bus va à l'aéroport ?
`),
G('travel', 'Voyage et hôtel', 'A2', `
I have a reservation in the name of Martin.|I've got a booking in the name of Martin.|I have a booking under the name Martin. ; J'ai une réservation au nom de Martin.
What time is breakfast?|What time is breakfast served? ; À quelle heure est le petit-déjeuner ?
The air conditioning doesn't work in my room.|The air conditioning in my room doesn't work.|The air conditioning isn't working in my room. ; La climatisation ne marche pas dans ma chambre.
Could I have a single ticket to London, please?|A single ticket to London, please.|Can I have a one-way ticket to London, please? ; Je pourrais avoir un aller simple pour Londres ?
What time does the train leave?|When does the train leave? ; À quelle heure part le train ?
My flight has been cancelled.|My flight was cancelled.|My flight has been canceled. ; Mon vol a été annulé.
I've lost my passport.|I have lost my passport.|I lost my passport. ; J'ai perdu mon passeport.
Can I leave my luggage here?|Can I leave my bags here?|Could I leave my luggage here? ; Je peux laisser mes bagages ici ?
Is there a cash machine near here?|Is there an ATM near here?|Is there a cash machine nearby? ; Il y a un distributeur près d'ici ?
We're going to stay for a week.|We're staying for a week.|We will stay for a week. ; On va rester une semaine.
`),
G('phone', 'Téléphone et rendez-vous', 'A2', `
Hello, could I speak to Mr Smith, please?|Hello, can I speak to Mr Smith, please?|Hello, may I speak to Mr Smith, please? ; Bonjour, je pourrais parler à M. Smith, s'il vous plaît ?
I'm calling about the job offer.|I'm phoning about the job offer.|I'm calling about the job advert. ; J'appelle au sujet de l'offre d'emploi.
Could you say that again, please?|Could you repeat that, please?|Can you repeat that, please? ; Vous pourriez répéter, s'il vous plaît ?
Could you speak more slowly, please?|Can you speak more slowly, please?|Could you speak slower, please? ; Vous pourriez parler plus lentement, s'il vous plaît ?
I'd like to make an appointment.|I would like to make an appointment.|I'd like to book an appointment. ; Je voudrais prendre rendez-vous.
Are you free on Thursday afternoon?|Are you available on Thursday afternoon? ; Tu es libre jeudi après-midi ?
Let's meet at six in front of the cinema.|Let's meet at six outside the cinema.|Let's meet at 6 in front of the cinema. ; Retrouvons-nous à six heures devant le cinéma.
Sorry, I can't make it tomorrow.|Sorry, I can't come tomorrow. ; Désolé, je ne peux pas demain.
I'll call you back later.|I will call you back later. ; Je te rappelle plus tard.
Can I leave a message?|Could I leave a message? ; Je peux laisser un message ?
`),
G('work', 'Études et travail', 'B1', `
I'm applying for an internship in a software company.|I'm applying for an internship at a software company. ; Je postule pour un stage dans une entreprise de logiciels.
I have some experience in programming.|I've got some experience in programming.|I have some programming experience. ; J'ai un peu d'expérience en programmation.
I'm good at solving problems.|I'm good at problem solving. ; Je suis doué pour résoudre des problèmes.
Could you explain that again?|Could you explain it again?|Can you explain that again? ; Vous pourriez réexpliquer ?
I'm afraid I won't be able to finish it by Friday.|I'm afraid I won't be able to finish by Friday.|I'm sorry, I won't be able to finish it by Friday. ; J'ai bien peur de ne pas pouvoir le finir pour vendredi.
I'll send you the file this afternoon.|I will send you the file this afternoon. ; Je vous envoie le fichier cet après-midi.
Let me check and get back to you.|Let me check and I'll get back to you. ; Je vérifie et je reviens vers vous.
What are the working hours?|What are the hours? ; Quels sont les horaires de travail ?
I'm working on a project with two classmates.|I'm working on a project with two other students. ; Je travaille sur un projet avec deux camarades.
I've got an exam next week, so I need to revise.|I have an exam next week, so I need to study.|I've got an exam next week, so I have to revise. ; J'ai un examen la semaine prochaine, donc je dois réviser.
`),
G('opinions', 'Donner son avis', 'B1', `
In my opinion, it's a good idea.|In my opinion, it is a good idea.|I think it's a good idea. ; À mon avis, c'est une bonne idée.
I totally agree with you.|I completely agree with you.|I fully agree with you. ; Je suis tout à fait d'accord avec toi.
I'm not sure about that.|I'm not so sure about that. ; Je n'en suis pas sûr.
I see your point, but I don't agree.|I see your point, but I disagree.|I understand your point, but I don't agree. ; Je comprends ton point de vue, mais je ne suis pas d'accord.
It depends on the situation.|That depends on the situation. ; Ça dépend de la situation.
The problem is that it's too expensive.|The problem is that it is too expensive.|The thing is, it's too expensive. ; Le problème, c'est que c'est trop cher.
On the one hand it's practical, but on the other hand it's expensive.|On the one hand, it's practical, but on the other hand, it's expensive. ; D'un côté c'est pratique, mais d'un autre côté c'est cher.
I'd rather stay at home tonight.|I would rather stay at home tonight.|I'd prefer to stay at home tonight.|I'd rather stay home tonight. ; Je préfère rester à la maison ce soir.
If I were you, I would talk to him.|If I were you, I'd talk to him.|If I was you, I'd talk to him. ; À ta place, je lui parlerais.
What do you think about it?|What do you think of it?|What do you think? ; Qu'est-ce que tu en penses ?
`),
G('problems', 'Problèmes, excuses, sentiments', 'B1', `
I'm sorry I'm late. I missed the bus.|Sorry I'm late, I missed the bus.|I'm sorry for being late. I missed the bus. ; Désolé d'être en retard, j'ai raté le bus.
Don't worry, it doesn't matter.|Don't worry, it's not a problem.|Don't worry, it's no big deal. ; Ne t'inquiète pas, ce n'est pas grave.
I didn't mean to hurt you.|I didn't want to hurt you. ; Je ne voulais pas te blesser.
Something's wrong with my phone.|There's something wrong with my phone.|Something is wrong with my phone. ; Mon téléphone a un problème.
I'm fed up with this weather.|I'm sick of this weather.|I'm tired of this weather. ; J'en ai marre de ce temps.
I'm really stressed about my exams.|I'm really stressed about the exams. ; Je suis vraiment stressé par mes examens.
It's not a big deal.|It's no big deal. ; Ce n'est pas bien grave.
I can't stand waiting.|I hate waiting.|I can't bear waiting. ; Je ne supporte pas d'attendre.
I'm so happy for you!|I'm really happy for you! ; Je suis tellement content pour toi !
Could you do me a favour?|Can you do me a favour?|Could you do me a favor? ; Tu pourrais me rendre un service ?
`),
G('advanced', 'Expressions naturelles', 'B2', `
It's up to you.|It's your call.|It's your decision. ; C'est toi qui vois.
I'll think about it.|I will think about it.|Let me think about it. ; Je vais y réfléchir.
I couldn't care less.|I really don't care. ; Je m'en fiche complètement.
It's not worth it.|It isn't worth it. ; Ça n'en vaut pas la peine.
I'm getting used to it.|I'm slowly getting used to it. ; Je commence à m'y habituer.
I've had enough.|I have had enough. ; J'en ai assez.
Let's call it a day.|Let's stop for today. ; On s'arrête là pour aujourd'hui.
It took me ages to find it.|It took me forever to find it.|It took me a long time to find it. ; J'ai mis un temps fou à le trouver.
No wonder you're tired!|No wonder you are tired!|It's no wonder you're tired! ; Pas étonnant que tu sois fatigué !
As far as I know, he's still in London.|As far as I know, he is still in London. ; Pour autant que je sache, il est toujours à Londres.
`),
];

export const PHRASES = PHRASE_GROUPS.flatMap((g) => g.items.map((p) => ({ ...p, level: g.level })));
export const PHRASE_BY_ID = Object.fromEntries(PHRASES.map((p) => [p.id, p]));
