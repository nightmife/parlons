// Leçons B1–B2. Même format que lessons_a.js.

export const LESSONS_B = [
{
  id: 'for_since', level: 'B1', title: 'Present perfect ou prétérit ? for et since',
  goal: 'Traduire « depuis » et choisir entre les deux temps du passé.',
  body: `
## Le grand piège : « depuis »
Pour une situation qui a commencé dans le passé et **dure encore**, le français utilise le présent. L'anglais utilise le **present perfect**.
= I have lived here for ten years. // J'habite ici depuis dix ans.
= She has known him since 2015. // Elle le connaît depuis 2015.
> Ne dis jamais « I live here since 2015 ». « depuis » + situation qui continue = present perfect.
## for ou since ?
| for + durée | for two hours, for three years, for a long time |
| since + point de départ | since Monday, since 2010, since I was a child |
= How long have you been here? // Depuis combien de temps es-tu là ?
## Present perfect ou prétérit ?
| Present perfect | Prétérit |
| période pas terminée : this week, today, ever, never | période terminée : last week, yesterday, in 2010 |
| pas de date : I've lost my keys. | une date : I lost my keys yesterday. |
| ça dure encore : I've worked here for 5 years. | c'est fini : I worked there for 5 years (je n'y suis plus). |
> Une question avec *When…?* appelle toujours le prétérit : *When did you arrive?*`,
  ex: [
    ['f', 'I have lived in Lyon ___ 2019.', 'since', 'Point de départ : since.'],
    ['f', "We've been friends ___ ten years.", 'for', 'Durée : for.'],
    ['f', 'She ___ here since January. (work)', 'has worked|has been working', 'Ça dure encore : present perfect.'],
    ['f', 'I ___ him for years. I know him very well. (know)', 'have known', 'know (verbe d\'état) + depuis : present perfect simple.'],
    ['f', 'He ___ in London from 2010 to 2015. (live)', 'lived', 'Période terminée : prétérit.'],
    ['f', 'When ___ you start learning English?', 'did', 'When… ? : prétérit.'],
    ['x', 'I live here since three years.', 'I have lived here for three years|I have been living here for three years', 'depuis + situation qui dure : present perfect ; durée : for.'],
    ['x', 'I know her since I was a child.', 'I have known her since I was a child', 'know + depuis : present perfect.'],
    ['x', 'I have finished my studies in 2020.', 'I finished my studies in 2020', 'Date passée : prétérit.'],
    ['t', 'Depuis combien de temps apprends-tu l\'anglais ?', 'How long have you been learning English|How long have you learned English|How long have you studied English|How long have you been studying English', 'Depuis combien de temps = How long + present perfect.'],
    ['t', 'Je ne l\'ai pas vu depuis lundi.', "I haven't seen him since Monday", 'Point de départ : since.'],
    ['t', 'Elle est mariée depuis cinq ans.', 'She has been married for five years', 'Situation qui dure : present perfect + for.'],
    ['t', 'J\'ai beaucoup travaillé cette semaine.', 'I have worked a lot this week|I have been working a lot this week', 'Période pas terminée (this week) : present perfect.'],
  ],
},
{
  id: 'pp_continuous', level: 'B1', title: 'Le present perfect continu',
  goal: 'Insister sur la durée d’une activité qui vient de se produire ou continue.',
  body: `
Forme : *have / has + been + verbe-ing*.
= I've been waiting for an hour. // J'attends depuis une heure.
= It's been raining all day. // Il pleut depuis ce matin.
## Quand l'utiliser
- une activité qui dure jusqu'à maintenant, avec une **durée** : *How long have you been studying?*
- une activité récente dont on voit le **résultat** : *You're out of breath. Have you been running?*
## Continu ou simple ?
| Continu : l'activité, la durée | Simple : le résultat, la quantité |
| I've been writing emails all morning. | I've written ten emails. |
| She's been reading that book for weeks. | She's read three books this month. |
> Les verbes d'état (*know, like, want, have* au sens de posséder) restent au simple : *I've known him for years* (jamais « I've been knowing »).`,
  ex: [
    ['f', 'I ___ for you for twenty minutes! (wait)', 'have been waiting', 'Durée jusqu\'à maintenant : have been + -ing.'],
    ['f', 'It ___ all day. (rain)', 'has been raining', 'it : has been + -ing.'],
    ['f', 'How long ___ English? (you / study)', 'have you been studying|have you studied', 'Question de durée.'],
    ['f', 'Your eyes are red. ___? (you / cry)', 'Have you been crying', 'Résultat visible d\'une activité récente.'],
    ['f', "I ___ three emails this morning. (write)", 'have written', 'Quantité, résultat : simple.'],
    ['f', 'She ___ him since they were at school. (know)', 'has known', 'Verbe d\'état : simple.'],
    ['x', "I've been knowing her for ten years.", "I've known her for ten years", 'know ne se met pas au continu.'],
    ['x', 'I am waiting here since two hours.', 'I have been waiting here for two hours', 'depuis + durée : present perfect (continu) + for.'],
    ['t', 'Je cherche mes clés depuis une heure.', 'I have been looking for my keys for an hour', 'Activité qui dure : present perfect continu.'],
    ['t', 'Qu\'est-ce que tu as fait (comme activité) ? Tu es tout sale !', "What have you been doing? You're (all/really/very/so) dirty", 'Activité récente qui laisse des traces.'],
    ['t', 'Ils travaillent sur ce projet depuis janvier.', 'They have been working on this project since January|They have worked on this project since January', 'depuis + point de départ : since.'],
  ],
},
{
  id: 'past_perfect', level: 'B1', title: 'Le past perfect (plus-que-parfait)',
  goal: 'Raconter une action antérieure à une autre action passée.',
  body: `
Forme : *had + participe passé* (à toutes les personnes).
= When I arrived, the film had already started. // Quand je suis arrivé, le film avait déjà commencé.
= She was tired because she hadn't slept. // Elle était fatiguée parce qu'elle n'avait pas dormi.
## À quoi il sert
Il marque l'action **la plus ancienne** quand on raconte au passé.
| Prétérit | Past perfect |
| When I got to the station, the train left. | When I got to the station, the train had left. |
| je suis arrivé, puis le train est parti | le train était déjà parti avant mon arrivée |
## Avec before, after, already, by the time
= By the time we arrived, everyone had gone home. // Le temps qu'on arrive, tout le monde était rentré.
= I had never seen the sea before that trip. // Je n'avais jamais vu la mer avant ce voyage.
> Avec *before* ou *after*, l'ordre est déjà clair : le prétérit simple suffit souvent (*I left after he arrived*).`,
  ex: [
    ['f', 'When we arrived, the party ___. (already / finish)', 'had already finished', 'Action antérieure : had + participe.'],
    ['f', "She didn't come because she ___ ill. (be)", 'had been', 'Cause antérieure : past perfect.'],
    ['f', 'I ___ snow before I went to Canada. (never / see)', 'had never seen', 'Expérience antérieure : had never seen.'],
    ['f', 'By the time the police came, the thief ___. (escape)', 'had escaped', 'By the time : past perfect.'],
    ['f', "He couldn't pay because he ___ his wallet. (lose)", 'had lost', 'Action antérieure.'],
    ['x', 'When I arrived, they already left.', 'When I arrived, they had already left', 'Action antérieure : had + participe.'],
    ['x', 'She told me she has seen the film.', 'She told me she had seen the film', 'Dans un récit au passé : had seen.'],
    ['t', 'Je n\'avais jamais mangé de sushis avant.', 'I had never eaten sushi before', 'Plus-que-parfait = had + participe.'],
    ['t', 'Le train était déjà parti.', 'The train had already left', 'Action terminée avant le moment raconté.'],
    ['t', 'Il était fatigué parce qu\'il avait mal dormi.', 'He was tired because he had slept badly|He was tired because he hadn\'t slept well', 'Cause antérieure : past perfect.'],
  ],
},
{
  id: 'used_to', level: 'B1', title: 'used to, be used to, get used to',
  goal: 'Parler des habitudes passées et de ce à quoi on est habitué.',
  body: `
## used to + base verbale : habitude passée (et terminée)
= I used to smoke. // Avant, je fumais. / J'avais l'habitude de fumer.
= Did you use to play football? // Tu jouais au foot avant ?
= She didn't use to like coffee. // Avant, elle n'aimait pas le café.
> Dans les questions et les négations, *did* porte le passé : *did you use to*, *didn't use to* (sans d).
## would : habitude passée (actions répétées seulement)
= Every summer, we would go to the beach. // Chaque été, nous allions à la plage.
> *would* ne marche pas avec les états : *I used to live in Paris* (jamais « I would live »).
## be used to + nom ou -ing : être habitué à
= I'm used to getting up early. // J'ai l'habitude de me lever tôt.
## get used to + nom ou -ing : s'habituer à
= You'll get used to the cold. // Tu t'habitueras au froid.
> Ici *to* est une préposition : il est suivi d'un nom ou d'un verbe en **-ing**, jamais de la base verbale.`,
  ex: [
    ['f', 'I ___ live in Paris, but now I live in Lyon.', 'used to', 'Habitude/état passé terminé : used to.'],
    ['f', '___ you use to play an instrument?', 'Did', 'Question : Did + use to.'],
    ['f', "She didn't ___ like vegetables.", 'use to', 'Après didn\'t : use to (sans d).'],
    ['f', "I'm used to ___ up early. (get)", 'getting', 'be used to + -ing.'],
    ['f', "It's hard at first, but you'll get used to ___ on the left. (drive)", 'driving', 'get used to + -ing.'],
    ['x', "I'm used to work at night.", "I'm used to working at night", 'be used to + -ing.'],
    ['x', 'Did you used to live here?', 'Did you use to live here', 'Après did : use to.'],
    ['t', 'Avant, je jouais au tennis.', 'I used to play tennis', 'Habitude passée : used to.'],
    ['t', 'Je ne suis pas habitué à ce climat.', "I'm not used to this [climate/weather]", 'être habitué à = be used to.'],
    ['t', 'Tu vas t\'y habituer.', "You'll get used to it|You will get used to it|You're going to get used to it", 's\'habituer = get used to.'],
    ['t', 'Il n\'y avait pas de supermarché ici avant.', "There didn't use to be a supermarket here|There used to be no supermarket here|There wasn't a supermarket here before", 'Négation : didn\'t use to.'],
  ],
},
{
  id: 'modals', level: 'B1', title: 'should, might, could, must : conseil et probabilité',
  goal: 'Donner un conseil et dire si quelque chose est probable ou certain.',
  body: `
## Conseil : should / ought to
= You should see a doctor. // Tu devrais voir un médecin.
= You shouldn't eat so much sugar. // Tu ne devrais pas manger autant de sucre.
= What should I do? // Qu'est-ce que je devrais faire ?
## Possibilité : may, might, could
= It might rain later. // Il se peut qu'il pleuve tout à l'heure.
= She may be at home. // Elle est peut-être chez elle.
- *might* est un peu moins sûr que *may*. *could* exprime aussi une possibilité.
## Déduction : must (certainement), can't (impossible)
= You've been travelling all day. You must be tired. // Tu dois être fatigué.
= That can't be true! // Ça ne peut pas être vrai !
> Pour une déduction négative, on dit *can't*, pas « mustn't » (qui exprime une interdiction).
## Au passé : modal + have + participe
= You should have told me. // Tu aurais dû me le dire.
= She must have forgotten. // Elle a dû oublier.
= They might have missed the train. // Ils ont peut-être raté le train.
= He can't have done that. // Il ne peut pas avoir fait ça.`,
  ex: [
    ['f', "You look tired. You ___ go to bed earlier. (conseil)", 'should|ought to', 'Conseil : should.'],
    ['f', 'Take an umbrella. It ___ rain. (possible)', 'might|may|could', 'Possibilité : might / may.'],
    ['f', "She's been working for twelve hours. She ___ be exhausted. (certainement)", 'must', 'Déduction quasi certaine : must.'],
    ['f', "That ___ be Tom, he's in Australia! (impossible)", "can't|cannot", 'Déduction négative : can\'t.'],
    ['f', 'You ___ told me! I would have helped you. (aurais dû)', 'should have', 'Reproche : should have + participe.'],
    ['f', "He isn't answering. He ___ his phone at home. (a dû oublier : forget)", 'must have forgotten', 'Déduction au passé : must have + participe.'],
    ['x', 'You should to call her.', 'You should call her', 'Pas de to après should.'],
    ['x', "It mustn't be true, it's impossible.", "It can't be true, it's impossible", 'Impossibilité : can\'t.'],
    ['t', 'Tu devrais arrêter de fumer.', 'You should stop smoking|You should quit smoking|You should give up smoking', 'Conseil : should + base ; stop + -ing.'],
    ['t', 'Il est peut-être malade.', 'He might be [ill/sick]|He may be [ill/sick]|Maybe he is [ill/sick]|Perhaps he is [ill/sick]', 'Possibilité : might / may be.'],
    ['t', 'Ils ont dû se perdre.', 'They must have got lost|They must have gotten lost', 'Déduction au passé.'],
    ['t', 'Tu n\'aurais pas dû dire ça.', "You shouldn't have said that", 'Reproche : shouldn\'t have + participe.'],
  ],
},
{
  id: 'conditionals', level: 'B1', title: 'Les conditionnels : if…',
  goal: 'Exprimer une condition réelle ou imaginaire.',
  body: `
## Type 0 : vérité générale
*If + présent, présent*
= If you heat ice, it melts. // Si on chauffe de la glace, elle fond.
## Type 1 : condition réelle, possible
*If + présent, will + base verbale*
= If it rains, I'll stay at home. // S'il pleut, je resterai à la maison.
> Jamais *will* après *if* : *If it rains* (jamais « If it will rain »). Pareil après *unless* (à moins que).
## Type 2 : situation imaginaire, irréelle
*If + prétérit, would + base verbale*
= If I had more money, I would travel. // Si j'avais plus d'argent, je voyagerais.
= If I were you, I'd accept. // À ta place, j'accepterais.
> Avec *be*, on peut dire *were* à toutes les personnes : *If I were rich…* (plus soigné que *If I was*).
> Jamais *would* après *if* : *If I had* (jamais « If I would have »).
## Ordre libre
La partie avec *if* peut aller au début (suivie d'une virgule) ou à la fin : *I'd travel if I had more money.*`,
  ex: [
    ['f', 'If it ___ tomorrow, we will stay at home. (rain)', 'rains', 'Type 1 : if + présent.'],
    ['f', 'If you study, you ___ the exam. (pass)', "will pass|'ll pass", 'Type 1 : will + base.'],
    ['f', 'If I ___ rich, I would buy a house by the sea. (be)', 'were|was', 'Type 2 : if + prétérit (were).'],
    ['f', 'If I had time, I ___ you. (help)', "would help|'d help", 'Type 2 : would + base.'],
    ['f', 'If you mix blue and yellow, you ___ green. (get)', 'get', 'Type 0 : présent, présent.'],
    ['f', "I won't go ___ you come with me. (à moins que)", 'unless', 'unless = à moins que, sauf si.'],
    ['x', 'If it will rain, I will take the bus.', 'If it rains, I will take the bus', 'Pas de will après if.'],
    ['x', 'If I would have a car, I would drive to work.', 'If I had a car, I would drive to work', 'Type 2 : if + prétérit.'],
    ['t', 'Si j\'étais toi, je l\'appellerais.', 'If I were you, I would call [him/her]|If I was you, I would call [him/her]', 'À ta place = If I were you.'],
    ['t', 'S\'il fait beau, nous irons à la plage.', "If [it's sunny/the weather is nice/the weather is good/it's nice], we will go to the beach", 'Type 1.'],
    ['t', 'Qu\'est-ce que tu ferais si tu gagnais au loto ?', 'What would you do if you won the lottery', 'Type 2 : would + if + prétérit.'],
    ['t', 'Je viendrai si j\'ai le temps.', 'I will come if I have (the) time', 'Type 1, partie if à la fin.'],
  ],
},
{
  id: 'passive', level: 'B1', title: 'La voix passive',
  goal: 'Mettre l’accent sur l’action ou sur ce qui la subit.',
  body: `
Forme : ***be* conjugué + participe passé**. Le temps est porté par *be*.
| présent | English is spoken here. |
| prétérit | The house was built in 1900. |
| present perfect | My bike has been stolen. |
| futur | The results will be announced tomorrow. |
| modal | It can be done. |
| continu | The road is being repaired. |
- On précise qui fait l'action avec *by* : *The book was written by Orwell.*
## Le « on » français
Le passif traduit souvent « on » :
= I was told that… // On m'a dit que…
= Smoking is not allowed. // Il est interdit de fumer.
## Passif avec deux compléments
= I was given a present. // On m'a offert un cadeau.
> En anglais, une personne peut être sujet du passif : *She was offered a job* (on lui a proposé un emploi).
## Être né
= I was born in 2004. // Je suis né en 2004.
> *born* : toujours *was / were born* pour parler de sa naissance.`,
  ex: [
    ['f', 'English ___ all over the world. (speak)', 'is spoken', 'Présent passif : is + participe.'],
    ['f', 'This bridge ___ in 1890. (build)', 'was built', 'Prétérit passif : was + participe.'],
    ['f', 'My car ___! (steal, present perfect)', 'has been stolen', 'Present perfect passif : has been + participe.'],
    ['f', 'The winner ___ tomorrow. (announce, futur)', 'will be announced', 'Futur passif : will be + participe.'],
    ['f', 'The road ___ at the moment. (repair)', 'is being repaired', 'Passif continu : is being + participe.'],
    ['f', 'This picture was painted ___ Picasso.', 'by', 'L\'auteur de l\'action : by.'],
    ['x', 'I am born in 2005.', 'I was born in 2005', 'Naissance : was born.'],
    ['x', 'The letter was wrote yesterday.', 'The letter was written yesterday', 'Participe passé : written.'],
    ['t', 'On m\'a volé mon portefeuille.', 'My wallet [was/has been] stolen|I had my wallet stolen', 'Passif : my wallet was stolen.'],
    ['t', 'Ici, on parle anglais.', 'English is spoken here', '« on » = passif.'],
    ['t', 'On lui a proposé un emploi à Londres.', 'She was offered a job in London|He was offered a job in London', 'La personne devient sujet.'],
    ['t', 'Ce film a été tourné en Irlande.', 'This [film/movie] was [shot/filmed/made] in Ireland', 'Prétérit passif.'],
  ],
},
{
  id: 'relatives', level: 'B1', title: 'Les relatives : who, which, that, whose, where',
  goal: 'Relier deux idées dans une même phrase.',
  body: `
| who | personne | The woman who lives next door is a nurse. |
| which | chose, animal | The book which I'm reading is great. |
| that | personne ou chose (relative essentielle) | The car that I bought is red. |
| whose | dont (possession) | The man whose car was stolen called the police. |
| where | où (lieu) | This is the town where I was born. |
| when | où (temps) | I remember the day when we met. |
## Pronom complément : on peut l'enlever
= The book (that) I'm reading is great. // Le livre que je lis est génial.
= The people (who) we met were nice. // Les gens que nous avons rencontrés étaient sympas.
> Quand le pronom est **sujet** du verbe qui suit, il est obligatoire : *The man who called you* (on ne peut pas l'enlever).
## Relatives avec virgules (information en plus)
= My brother, who lives in Spain, is a chef. // Mon frère, qui habite en Espagne, est chef.
> Entre virgules, *that* est impossible et le pronom ne peut pas être supprimé.
## « ce que » = what
= I don't understand what he says. // Je ne comprends pas ce qu'il dit.
= What I need is a holiday. // Ce dont j'ai besoin, ce sont des vacances.`,
  ex: [
    ['f', 'The girl ___ sits next to me is French.', 'who|that', 'Personne, pronom sujet : who (ou that).'],
    ['f', 'This is the house ___ I grew up.', 'where', 'Lieu : where.'],
    ['f', 'I have a friend ___ father is a pilot.', 'whose', 'Possession : whose.'],
    ['f', 'The film ___ we saw yesterday was boring. (chose)', 'that|which', 'Chose, complément : which ou that (on peut aussi ne rien mettre).'],
    ['f', "I don't know ___ you mean. (ce que)", 'what', 'ce que = what.'],
    ['f', "My car, ___ is ten years old, still works well.", 'which', 'Entre virgules, chose : which (jamais that).'],
    ['x', 'The man which called you is my uncle.', 'The man who called you is my uncle|The man that called you is my uncle', 'Personne : who.'],
    ['x', 'I understand that you mean.', 'I understand what you mean', 'ce que = what.'],
    ['t', 'C\'est la ville où je suis né.', '[This/It] is the [town/city] where I was born', 'Lieu : where ; naissance : was born.'],
    ['t', 'La femme qui habite à côté est infirmière.', 'The woman [who/that] lives next door is a nurse', 'Pronom sujet : who.'],
    ['t', 'Ce dont j\'ai besoin, c\'est de dormir.', 'What I need is (to) sleep|What I need is some sleep', 'Ce dont = what.'],
    ['t', 'Le livre que tu m\'as prêté est génial.', 'The book (that/which) you lent me is [great/brilliant/amazing]', 'Pronom complément : facultatif.'],
  ],
},
{
  id: 'gerund_infinitive', level: 'B1', title: 'Verbe + -ing ou verbe + to',
  goal: 'Savoir quelle forme suit enjoy, want, stop, remember…',
  body: `
## Verbes suivis de -ing
*enjoy, finish, mind, avoid, suggest, keep, practise, consider, can't stand, don't mind, look forward to, be used to*
= I enjoy cooking. // J'aime cuisiner.
= Would you mind closing the window? // Ça vous dérangerait de fermer la fenêtre ?
## Verbes suivis de to + base verbale
*want, decide, hope, plan, promise, refuse, learn, manage, need, would like, offer, agree, afford, seem*
= I want to leave. // Je veux partir.
= She decided to stay. // Elle a décidé de rester.
## Après une préposition : toujours -ing
= I'm interested in learning Chinese. // Ça m'intéresse d'apprendre le chinois.
= Thank you for helping me. // Merci de m'avoir aidé.
= She left without saying goodbye. // Elle est partie sans dire au revoir.
## Changement de sens
| stop + -ing : arrêter de | I stopped smoking. (j'ai arrêté de fumer) |
| stop + to : s'arrêter pour | I stopped to smoke. (je me suis arrêté pour fumer) |
| remember + -ing : se souvenir d'avoir fait | I remember meeting him. |
| remember + to : penser à faire | Remember to call your mum. |
| try + -ing : essayer (pour voir) | Try adding some salt. |
| try + to : s'efforcer de | I tried to open the door, but it was locked. |
> *like, love, hate, start, begin* acceptent les deux : *I like swimming / I like to swim*.`,
  ex: [
    ['f', 'I enjoy ___ in the sea. (swim)', 'swimming', 'enjoy + -ing.'],
    ['f', 'She decided ___ a new job. (look for)', 'to look for', 'decide + to.'],
    ['f', 'Would you mind ___ the door? (open)', 'opening', 'mind + -ing.'],
    ['f', "I'm looking forward to ___ you. (see)", 'seeing', 'look forward to + -ing (to est une préposition).'],
    ['f', 'He promised ___ late again. (not / be)', 'not to be', 'promise + to ; négation : not to.'],
    ['f', "Don't forget ___ the lights. (turn off)", 'to turn off', 'forget + to : penser à faire.'],
    ['f', 'He left without ___ anything. (say)', 'saying', 'Après une préposition : -ing.'],
    ['x', 'I want going home.', 'I want to go home', 'want + to.'],
    ['x', 'I am interested in learn English.', 'I am interested in learning English', 'Préposition + -ing.'],
    ['x', 'She suggested to go to the cinema.', 'She suggested going to the cinema', 'suggest + -ing.'],
    ['t', 'J\'ai arrêté de fumer.', 'I [stopped/quit/gave up] smoking|I have [stopped/quit/given up] smoking', 'stop + -ing = arrêter de.'],
    ['t', 'Je me souviens de l\'avoir rencontré.', 'I remember meeting him', 'remember + -ing = se souvenir d\'avoir fait.'],
    ['t', 'Merci de m\'avoir aidé.', 'Thank you for helping me|Thanks for helping me', 'for + -ing.'],
  ],
},
{
  id: 'reported_speech', level: 'B1', title: 'Le discours indirect',
  goal: 'Rapporter ce que quelqu’un a dit ou demandé.',
  body: `
Quand le verbe introducteur est au passé (*said, told, asked*), les temps reculent d'un cran.
| Discours direct | Discours indirect |
| "I am tired." | She said (that) she was tired. |
| "I work here." | He said he worked there. |
| "I'm leaving." | She said she was leaving. |
| "I saw him." / "I have seen him." | He said he had seen him. |
| "I will call." | She said she would call. |
| "I can swim." | He said he could swim. |
## Les repères changent aussi
*today → that day, tomorrow → the next day, yesterday → the day before, here → there, this → that, now → then*
## Les questions rapportées : ordre affirmatif, pas de do
= "Where do you live?" → He asked me where I lived. // Il m'a demandé où j'habitais.
= "Are you OK?" → She asked if I was OK. // Elle m'a demandé si j'allais bien.
> Dans une question rapportée, pas d'inversion ni de point d'interrogation : *She asked where I lived* (jamais « where did I live »).
## Ordres et demandes : tell / ask + someone + to
= "Sit down." → He told me to sit down. // Il m'a dit de m'asseoir.
= "Don't be late." → She asked us not to be late. // Elle nous a demandé de ne pas être en retard.`,
  ex: [
    ['r', 'Rapporte au discours indirect', 'She said: "I am hungry."', 'She said (that) she was hungry', 'am → was.'],
    ['r', 'Rapporte au discours indirect', 'He said: "I will help you."', 'He said (that) he would help me|He said (that) he would help us', 'will → would.'],
    ['r', 'Rapporte au discours indirect', 'Tom said: "I have finished."', 'Tom said (that) he had finished', 'have finished → had finished.'],
    ['r', 'Rapporte la question', 'She asked me: "Where do you work?"', 'She asked me where I worked', 'Ordre affirmatif, sans do ; work → worked.'],
    ['r', 'Rapporte la question', 'He asked: "Are you coming?"', 'He asked if I was coming|He asked whether I was coming|He asked if we were coming', 'Question fermée : if / whether.'],
    ['r', 'Rapporte l\'ordre', 'The teacher said to us: "Be quiet."', 'The teacher told us to be quiet', 'tell + personne + to.'],
    ['r', 'Rapporte la demande', 'She said to me: "Don\'t call me after ten."', 'She told me not to call her after ten|She asked me not to call her after ten', 'Ordre négatif : not to.'],
    ['x', 'He asked me where did I live.', 'He asked me where I lived', 'Pas de did ni d\'inversion.'],
    ['x', 'She said me she was busy.', 'She told me she was busy|She said she was busy', 'tell + personne.'],
    ['t', 'Il m\'a dit qu\'il était fatigué.', 'He told me (that) he was tired', 'tell + personne, temps reculé.'],
    ['t', 'Elle m\'a demandé si j\'aimais le jazz.', 'She asked me if I liked jazz|She asked me whether I liked jazz', 'Question fermée rapportée : if.'],
  ],
},
{
  id: 'prep_verbs', level: 'B1', title: 'Les prépositions après verbes et adjectifs',
  goal: 'Retenir les associations qui ne se traduisent pas mot à mot.',
  body: `
## Verbe + préposition
| depend on | dépendre de |
| listen to | écouter |
| wait for | attendre |
| look for | chercher |
| look at | regarder |
| look after | s'occuper de |
| pay for | payer (quelque chose) |
| think about / of | penser à |
| belong to | appartenir à |
| agree with | être d'accord avec |
| apply for | postuler à |
| arrive in (ville) / at (lieu) | arriver à |
## Verbes sans préposition en anglais
*discuss something* (discuter de), *answer a question* (répondre à), *enter a room* (entrer dans), *call someone* (téléphoner à), *marry someone* (épouser), *phone someone*.
## Adjectif + préposition
| interested in | intéressé par |
| good at / bad at | bon / mauvais en |
| afraid of | avoir peur de |
| proud of | fier de |
| tired of | fatigué de, en avoir assez de |
| angry with (personne) / about (chose) | en colère contre |
| married to | marié à |
| different from | différent de |
| similar to | semblable à |
| responsible for | responsable de |
> « Ça dépend de toi » = *It depends on you* (jamais « depends of »).`,
  ex: [
    ['f', 'It depends ___ the weather.', 'on', 'depend on.'],
    ['f', "I'm waiting ___ the bus.", 'for', 'wait for.'],
    ['f', 'She is very good ___ maths.', 'at', 'good at.'],
    ['f', "I'm not interested ___ politics.", 'in', 'interested in.'],
    ['f', 'Who is going to look ___ the children?', 'after', 'look after = s\'occuper de.'],
    ['f', 'He is married ___ a doctor.', 'to', 'married to.'],
    ['f', "I'm afraid ___ dogs.", 'of', 'afraid of.'],
    ['x', 'It depends of you.', 'It depends on you', 'depend on.'],
    ['x', 'We discussed about the problem.', 'We discussed the problem|We talked about the problem', 'discuss sans préposition.'],
    ['x', 'Listen me!', 'Listen to me', 'listen to.'],
    ['t', 'Je cherche mon téléphone.', "I'm looking for my phone", 'chercher = look for.'],
    ['t', 'Elle est fière de son fils.', 'She is proud of her son', 'proud of.'],
    ['t', 'Je suis d\'accord avec toi.', 'I agree with you', 'Pas de be : I agree.'],
  ],
},
{
  id: 'tags', level: 'B1', title: 'Question tags, so / neither, réponses courtes',
  goal: 'Réagir naturellement comme à l’oral : « n’est-ce pas ? », « moi aussi ».',
  body: `
## Question tags : « n'est-ce pas ? »
On reprend l'auxiliaire et le sujet, en inversant la polarité.
= It's cold, isn't it? // Il fait froid, hein ?
= You don't like fish, do you? // Tu n'aimes pas le poisson, si ?
= She lives here, doesn't she? // Elle habite ici, non ?
= They went home, didn't they? // Ils sont rentrés, non ?
= You can swim, can't you? // Tu sais nager, non ?
> Phrase affirmative → tag négatif ; phrase négative → tag affirmatif. Sans auxiliaire, on utilise *do / does / did*.
> Cas particuliers : *I'm right, aren't I?* — *Let's go, shall we?*
## Moi aussi / moi non plus
| affirmatif | So + auxiliaire + sujet | "I love jazz." "So do I." |
| négatif | Neither + auxiliaire + sujet | "I can't swim." "Neither can I." |
= "I'm tired." "So am I." // « Je suis fatigué. » « Moi aussi. »
= "I didn't go." "Neither did I." // « Je n'y suis pas allé. » « Moi non plus. »
> À l'oral courant, on entend aussi *Me too* et *Me neither*.
## Réponses courtes
= Do you like it? — Yes, I do. // Oui. Have you finished? — No, I haven't.
> Un simple *Yes* ou *No* paraît sec : on reprend l'auxiliaire.`,
  ex: [
    ['f', "It's a nice day, ___?", "isn't it", 'Affirmatif avec be → isn\'t it.'],
    ['f', "You don't eat meat, ___?", 'do you', 'Négatif → tag affirmatif avec do.'],
    ['f', 'She works in London, ___?', "doesn't she", 'Présent simple, 3e personne → doesn\'t she.'],
    ['f', 'They came yesterday, ___?', "didn't they", 'Prétérit → didn\'t.'],
    ['f', 'You can drive, ___?', "can't you", 'Modal : on le reprend.'],
    ['f', '"I love this song." "So ___ I."', 'do', 'Présent simple → So do I.'],
    ['f', '"I\'m not hungry." "Neither ___ I."', 'am', 'be → Neither am I.'],
    ['f', '"I went to the concert." "So ___ I."', 'did', 'Prétérit → So did I.'],
    ['r', 'Réponds par une réponse courte négative', 'Have you seen this film?', "No, I haven't", 'On reprend l\'auxiliaire have.'],
    ['x', "You are French, isn't it?", "You are French, aren't you", 'Le tag reprend le sujet et l\'auxiliaire.'],
    ['t', '« Je n\'aime pas le café. » « Moi non plus. »', "I don't like coffee. Neither do I|I don't like coffee. Me neither|I don't like coffee. Nor do I", 'Négatif : Neither do I.'],
    ['t', 'Tu viens ce soir, non ?', "You're coming tonight, aren't you|You are coming this evening, aren't you", 'Présent continu → aren\'t you.'],
  ],
},
{
  id: 'conditional3', level: 'B2', title: 'Conditionnel passé, wish et if only',
  goal: 'Imaginer un autre passé et exprimer des regrets.',
  body: `
## Type 3 : passé imaginaire
*If + past perfect, would have + participe passé*
= If I had studied, I would have passed. // Si j'avais travaillé, j'aurais réussi.
= If you had told me, I would have helped you. // Si tu me l'avais dit, je t'aurais aidé.
> Jamais *would* dans la partie *if* : *If I had known* (jamais « If I would have known »).
## Conditionnel mixte : passé → présent
= If I had taken the job, I would live in London now. // Si j'avais accepté le poste, j'habiterais à Londres aujourd'hui.
## wish / if only : les regrets
| regret sur le présent | wish + prétérit | I wish I had more time. (J'aimerais avoir plus de temps.) |
| regret sur le passé | wish + past perfect | I wish I hadn't said that. (Je regrette d'avoir dit ça.) |
| agacement, souhait de changement | wish + would | I wish you would stop. (J'aimerais que tu arrêtes.) |
= If only I knew the answer! // Si seulement je connaissais la réponse !
= I wish I were taller. // J'aimerais être plus grand.`,
  ex: [
    ['f', 'If I had known, I ___ you. (tell)', 'would have told', 'Type 3 : would have + participe.'],
    ['f', 'If she ___ earlier, she would have caught the train. (leave)', 'had left', 'Type 3 : if + past perfect.'],
    ['f', 'If we ___ lost, we would have arrived on time. (not / get)', "hadn't got|had not got|hadn't gotten", 'Type 3 négatif.'],
    ['f', 'I wish I ___ more free time. (have, maintenant)', 'had', 'Regret présent : wish + prétérit.'],
    ['f', "I wish I ___ to the party. It was great, apparently. (go)", 'had gone', 'Regret passé : wish + past perfect.'],
    ['f', 'I wish you ___ making that noise! (stop)', 'would stop', 'Agacement : wish + would.'],
    ['x', 'If I would have seen him, I would have said hello.', 'If I had seen him, I would have said hello', 'Pas de would après if.'],
    ['x', 'I wish I can speak Chinese.', 'I wish I could speak Chinese', 'wish + prétérit (can → could).'],
    ['t', 'Si j\'avais su, je ne serais pas venu.', "If I had known, I wouldn't have come|If I'd known, I wouldn't have come", 'Type 3.'],
    ['t', 'Je regrette de ne pas avoir travaillé plus.', "I wish I had worked harder|I wish I had worked more|I wish I had studied more|I wish I had studied harder", 'wish + past perfect.'],
    ['t', 'Si seulement il faisait plus chaud !', 'If only it was warmer|If only it were warmer|If only it was hotter|If only it were hotter', 'If only + prétérit.'],
  ],
},
{
  id: 'phrasal_verbs', level: 'B2', title: 'Les phrasal verbs essentiels',
  goal: 'Comprendre la logique des verbes à particule et retenir les plus courants.',
  body: `
Un phrasal verb = verbe + particule (*up, out, off, on, down…*). Le sens n'est pas toujours la somme des deux.
## Les plus utiles
| get up | se lever | find out | découvrir |
| wake up | se réveiller | give up | abandonner, arrêter |
| turn on / off | allumer / éteindre | look up | chercher (un mot, une info) |
| put on | mettre (un vêtement) | take off | enlever ; décoller (avion) |
| pick up | ramasser, aller chercher | come back | revenir |
| run out of | être à court de | look forward to | avoir hâte de |
| get on with | bien s'entendre avec | carry on | continuer |
| break down | tomber en panne | set up | créer, installer |
| turn down | refuser ; baisser (le son) | put off | repousser |
## Où mettre le complément ?
- Avec un nom : avant ou après la particule : *turn off the light / turn the light off*.
- Avec un **pronom** : **entre** le verbe et la particule : *turn it off* (jamais « turn off it »).
> Certains ne se séparent jamais : *look after the kids → look after them*, *get on the bus → get on it*.`,
  ex: [
    ['f', 'Can you turn ___ the TV? I want to sleep.', 'off', 'turn off = éteindre.'],
    ['f', "I've run ___ of milk. Can you buy some?", 'out', 'run out of = être à court de.'],
    ['f', "Don't give ___! You're almost there.", 'up', 'give up = abandonner.'],
    ['f', 'Put ___ your coat, it\'s cold outside.', 'on', 'put on = mettre (un vêtement).'],
    ['f', 'Our car broke ___ on the motorway.', 'down', 'break down = tomber en panne.'],
    ['f', 'I get ___ very well with my colleagues.', 'on', 'get on with = bien s\'entendre avec.'],
    ['f', 'I need to find ___ what time the train leaves.', 'out', 'find out = découvrir, se renseigner.'],
    ['x', 'This music is too loud. Turn down it.', 'This music is too loud. Turn it down', 'Pronom entre le verbe et la particule.'],
    ['x', 'Pick up them, please.', 'Pick them up, please', 'Pronom entre le verbe et la particule.'],
    ['t', 'Je passe te chercher à huit heures.', "I'll pick you up at eight|I will pick you up at eight (o'clock)|I'm picking you up at eight", 'pick someone up = aller chercher.'],
    ['t', 'Cherche ce mot dans le dictionnaire.', 'Look this word up in the dictionary|Look up this word in the dictionary|Look that word up in the dictionary|Look up that word in the dictionary', 'look up = chercher une information.'],
    ['t', 'L\'avion a décollé avec une heure de retard.', 'The plane took off an hour late|The plane took off one hour late|The plane took off with a one-hour delay', 'take off = décoller.'],
  ],
},
{
  id: 'causative', level: 'B2', title: 'Faire faire : have / get something done',
  goal: 'Dire qu’on fait faire quelque chose par quelqu’un.',
  body: `
## have / get + objet + participe passé
On ne fait pas l'action soi-même : un professionnel la fait pour nous.
= I had my hair cut. // Je me suis fait couper les cheveux.
= We're having the kitchen painted. // On fait repeindre la cuisine.
= I need to get my car repaired. // Je dois faire réparer ma voiture.
> *get* est plus familier que *have*, le sens est le même.
## Pour une mauvaise surprise
= She had her bag stolen. // Elle s'est fait voler son sac.
## make / let + personne + base verbale
| make someone do | obliger quelqu'un à faire | My boss made me work late. |
| let someone do | laisser, permettre | My parents let me go out. |
| have someone do | faire faire (demander à quelqu'un) | I'll have him call you back. |
| get someone to do | convaincre, faire faire | I got my brother to help me. |
> Après *make* et *let*, pas de *to* : *They made me wait* (jamais « made me to wait »).`,
  ex: [
    ['f', 'I had my car ___ yesterday. (repair)', 'repaired', 'have + objet + participe passé.'],
    ['f', "She's going to have her hair ___. (cut)", 'cut', 'cut → cut.'],
    ['f', 'We need to get the roof ___. (fix)', 'fixed', 'get + objet + participe.'],
    ['f', 'My parents never ___ me stay out late. (laisser)', 'let', 'let + personne + base verbale.'],
    ['f', 'The teacher made us ___ the text again. (read)', 'read', 'make + personne + base verbale, sans to.'],
    ['f', 'I got my sister ___ me with the move. (help)', 'to help', 'get + personne + to.'],
    ['x', 'I cut my hair at the hairdresser\'s.', "I had my hair cut at the hairdresser's|I got my hair cut at the hairdresser's", 'Ce n\'est pas toi qui coupes : had my hair cut.'],
    ['x', 'They made me to wait for an hour.', 'They made me wait for an hour', 'make + base verbale sans to.'],
    ['t', 'Je me suis fait voler mon téléphone.', 'I had my phone stolen|I got my phone stolen|My phone was stolen', 'have + objet + participe.'],
    ['t', 'Ils font construire une maison.', 'They are having a house built|They are getting a house built', 'have something done au présent continu.'],
    ['t', 'Laisse-moi t\'aider.', 'Let me help you', 'let + base verbale.'],
  ],
},
];
