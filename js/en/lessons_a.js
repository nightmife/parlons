// Leçons A1–A2. Format du cours : voir lessons.js.
// Exercices : ['f', phrase à trou ___ (indice), réponse, explication]
//             ['t', phrase française, traduction, explication]
//             ['x', phrase fautive, phrase corrigée, explication]
//             ['r', consigne, phrase de départ, réponse, explication]
// Réponses : « a|b » variantes, « [a/b] » choix dans la phrase, « (x) » facultatif. Contractions et ponctuation libres.
// N'ajouter des exercices qu'à la fin d'une liste : leur position sert d'identifiant à la progression.

export const LESSONS_A = [
{
  id: 'be', level: 'A1', title: 'Le verbe be (être)',
  goal: 'Dire qui on est, comment on va, où l’on est, son âge.',
  body: `
*be* sert à dire ce qu'on est, comment on va et où l'on est. Il sert aussi dans des cas où le français utilise « avoir » : l'âge, la faim, la soif, le froid.
## Les formes au présent
| | Affirmatif | Négatif | Question |
| I | I am — I'm | I'm not | Am I…? |
| you / we / they | you are — you're | you aren't | Are you…? |
| he / she / it | she is — she's | she isn't | Is she…? |
- À l'oral et dans les messages, on utilise presque toujours les formes contractées.
- Pour poser une question, on inverse : *You are tired* → *Are you tired?*
## Là où le français dit « avoir »
= I'm 20 (years old). // J'ai 20 ans.
= I'm hungry. // J'ai faim.
= She's cold. // Elle a froid.
= Are you afraid? // As-tu peur ?
= He's right. // Il a raison.
> Ne dis jamais « I have 20 years » : l'âge se dit avec *be*.
## Réponses courtes
= Are you French? — Yes, I am. / No, I'm not. // Tu es français ? — Oui. / Non.
> Dans une réponse courte affirmative, pas de contraction : *Yes, I am* (jamais « Yes, I'm »).`,
  ex: [
    ['f', 'I ___ a student.', 'am', 'Avec I, la forme est am.'],
    ['f', 'My parents ___ at home.', 'are', 'Sujet pluriel (= they) : are.'],
    ['f', 'It ___ cold today.', 'is', 'it : is.'],
    ['f', '___ you tired?', 'Are', 'Question avec be : on inverse be et le sujet.'],
    ['f', 'She ___ happy. (négatif)', "isn't|is not", 'Négation : be + not, contracté en isn\'t.'],
    ['t', 'J\'ai 25 ans.', 'I am [25/twenty-five] (years old)', 'L\'âge se dit avec be : I am 25.'],
    ['t', 'Nous avons faim.', 'We are hungry', 'avoir faim = be hungry.'],
    ['t', 'Il a raison.', 'He is right', 'avoir raison = be right.'],
    ['t', 'Est-ce que tu es prêt ?', 'Are you ready', 'Question avec be : inversion, sans do.'],
    ['x', 'I have 18 years.', 'I am [18/eighteen] (years old)', 'L\'âge : be + nombre (years old facultatif).'],
    ['x', 'Do you are French?', 'Are you French', 'Jamais de do avec be.'],
    ['t', 'Ils ne sont pas à la maison.', 'They are not (at) home', 'Négation : are not / aren\'t.'],
    ['r', 'Réponds par une réponse courte affirmative', 'Are you a student?', 'Yes, I am', 'Réponse courte : Yes + sujet + be, sans contraction.'],
  ],
},
{
  id: 'articles', level: 'A1', title: 'Les articles a, an, the… ou rien',
  goal: 'Savoir quand mettre un article, et surtout quand ne pas en mettre.',
  body: `
## a / an : un, une
- *a* devant un **son** consonne : *a book, a university* (prononcé « you »), *a European city*.
- *an* devant un **son** voyelle : *an apple, an hour* (h muet), *an honest man*.
## the : le, la, les (quelque chose de précis)
= The book on the table is mine. // Le livre sur la table est à moi.
= Can you close the door? // Tu peux fermer la porte ?
## Pas d'article pour parler en général
= I love music. // J'aime la musique.
= Cats are independent. // Les chats sont indépendants.
= Life is beautiful. // La vie est belle.
> C'est le piège n°1 des francophones : quand on parle **en général**, l'anglais ne met **pas** d'article. « J'aime le chocolat » se dit *I love chocolate*.
## Les métiers prennent a / an
= She's a doctor. // Elle est médecin.
= I'm an engineer. // Je suis ingénieur.
## Autres cas sans article
- les repas : *have breakfast, at lunch*
- *go to school, go to bed, go to work, go home*
- langues, sports, matières : *I speak English, I play tennis, I love history*
- les jours : *on Monday*`,
  ex: [
    ['f', 'I want ___ apple.', 'an', 'apple commence par un son voyelle : an.'],
    ['f', 'She is ___ engineer.', 'an', 'Métier : a/an obligatoire ; engineer commence par un son voyelle.'],
    ['f', 'He works at ___ university in Leeds.', 'a', 'university se prononce « you- » : son consonne, donc a.'],
    ['f', 'We waited for ___ hour.', 'an', 'Le h de hour est muet : an hour.'],
    ['t', 'J\'aime le café.', 'I [love/like] coffee', 'En général : pas d\'article.'],
    ['t', 'Elle est professeur.', 'She is a teacher', 'Métier : a obligatoire.'],
    ['t', 'Les enfants aiment les bonbons.', '[Children/Kids] [love/like] [sweets/candy]', 'Vérité générale : pas d\'article.'],
    ['x', 'The life is short.', 'Life is short', 'La vie en général : pas d\'article.'],
    ['x', 'He is doctor.', 'He is a doctor', 'Métier : a obligatoire.'],
    ['f', 'Can you close ___ door, please?', 'the', 'Une porte précise (celle de la pièce) : the.'],
    ['t', 'Je vais à l\'école à pied.', 'I walk to school|I go to school on foot', 'go to school : pas d\'article.'],
    ['t', 'Il joue au tennis le samedi.', 'He plays tennis on [Saturdays/Saturday]', 'Sports : pas d\'article. Jours : on.'],
  ],
},
{
  id: 'plural', level: 'A1', title: 'Le pluriel, this / that / these / those',
  goal: 'Former le pluriel des noms et montrer quelque chose.',
  body: `
## Le pluriel
- en général +s : *a book → books*
- après s, sh, ch, x, o : +es : *buses, dishes, watches, boxes, potatoes*
- consonne + y → -ies : *a city → cities* (mais *a day → days*)
- f/fe → -ves : *a knife → knives, a leaf → leaves, a wife → wives*
## Pluriels irréguliers à connaître
| man → men | woman → women |
| child → children | person → people |
| foot → feet | tooth → teeth |
| mouse → mice | sheep → sheep, fish → fish |
## this / that / these / those
| | proche | éloigné |
| singulier | this (ce… -ci) | that (ce… -là) |
| pluriel | these | those |
= This book is great. // Ce livre est génial.
= Those shoes are expensive. // Ces chaussures-là sont chères.
> Les adjectifs ne s'accordent jamais : *a big car → big cars* (jamais « bigs »).`,
  ex: [
    ['f', 'I have two ___. (child)', 'children', 'Pluriel irrégulier : child → children.'],
    ['f', 'There are three ___ on the table. (box)', 'boxes', 'Après x : +es.'],
    ['f', 'Many ___ live in this city. (person)', 'people', 'person → people.'],
    ['f', 'I visited five ___ last year. (city)', 'cities', 'Consonne + y → ies.'],
    ['f', 'Be careful, these ___ are sharp. (knife)', 'knives', 'fe → ves.'],
    ['f', 'My ___ hurt after the walk. (foot)', 'feet', 'foot → feet.'],
    ['f', 'I saw two ___ in the kitchen! (mouse)', 'mice', 'mouse → mice.'],
    ['x', 'They are very nices people.', 'They are very nice people', 'Les adjectifs sont invariables.'],
    ['f', '___ shoes over there are mine. (ces… -là)', 'Those', 'Pluriel et éloigné : those.'],
    ['f', '___ is my brother, next to me. (celui-ci, tout près)', 'This', 'Singulier et proche : this.'],
    ['t', 'Ces pommes sont délicieuses.', '[These/Those] apples are delicious', 'Pluriel : these (proche) ou those (éloigné).'],
    ['t', 'Les femmes et les enfants d\'abord !', 'Women and children first', 'woman → women, child → children.'],
  ],
},
{
  id: 'present_simple', level: 'A1', title: 'Le présent simple',
  goal: 'Parler de ses habitudes, de ses goûts et de faits généraux.',
  body: `
Le présent simple sert pour les **habitudes**, les **vérités générales** et les **goûts**.
= I work in Lyon. // Je travaille à Lyon.
= She drinks tea every morning. // Elle boit du thé tous les matins.
## Le -s de la 3e personne
Avec *he, she, it* (ou un nom au singulier), on ajoute **-s** : *he works, my sister lives*.
- -es après s, sh, ch, x, o : *watches, goes, does*
- consonne + y → -ies : *study → studies* (mais *play → plays*)
- have → *has*
## Négation : don't / doesn't + base verbale
| I / you / we / they | don't work |
| he / she / it | doesn't work |
> Avec *doesn't*, le verbe perd son -s : *She doesn't work* (jamais « doesn't works »).
## Question : Do / Does + sujet + base verbale
= Do you like pizza? — Yes, I do. // Tu aimes la pizza ? — Oui.
= Where does he live? // Où habite-t-il ?
> *Does* porte déjà la marque de la 3e personne : *Does she work?* (jamais « Does she works? »).`,
  ex: [
    ['f', 'She ___ in a bank. (work)', 'works', '3e personne du singulier : +s.'],
    ['f', 'My brother ___ TV every evening. (watch)', 'watches', 'Après ch : +es.'],
    ['f', 'He ___ hard for his exams. (study)', 'studies', 'Consonne + y → ies.'],
    ['f', 'I ___ coffee. (not / like)', "don't like|do not like", 'Négation : don\'t + base verbale.'],
    ['f', 'Tom ___ meat. (not / eat)', "doesn't eat|does not eat", 'he/she : doesn\'t + base verbale, sans -s.'],
    ['f', '___ you speak Spanish?', 'Do', 'Question : Do + sujet + base verbale.'],
    ['f', 'Where ___ your sister live?', 'does', 'Sujet à la 3e personne : does.'],
    ['x', 'He don\'t like football.', "He doesn't like football", 'he : doesn\'t.'],
    ['x', 'Does she works here?', 'Does she work here', 'Après does, base verbale sans -s.'],
    ['t', 'Mon père se lève à six heures.', 'My [father/dad] gets up at six (o\'clock)', 'se lever = get up ; 3e personne : gets.'],
    ['t', 'Elle n\'habite pas ici.', "She doesn't live here", 'doesn\'t + live.'],
    ['t', 'Est-ce que ton frère joue au foot ?', 'Does your brother play [football/soccer]', 'Does + sujet + base verbale.'],
    ['r', 'Mets à la forme négative', 'He plays the guitar.', "He doesn't play (the) guitar", 'doesn\'t + play (le -s disparaît).'],
  ],
},
{
  id: 'present_continuous', level: 'A1', title: 'Le présent continu (be + -ing)',
  goal: 'Décrire ce qui se passe maintenant, et choisir entre simple et continu.',
  body: `
Le présent continu (*be + verbe-ing*) décrit ce qui se passe **en ce moment** ou une situation **temporaire**.
= I'm working now. // Je travaille en ce moment.
= She's living with her parents this year. // Elle habite chez ses parents cette année.
## Formation
| I | am ('m) working |
| you / we / they | are ('re) working |
| he / she / it | is ('s) working |
- Négation : *I'm not working, he isn't working*
- Question : *Are you working? What is she doing?*
## Orthographe du -ing
- e final disparaît : *make → making*
- consonne doublée après une voyelle courte accentuée : *run → running, sit → sitting*
- ie → y : *lie → lying*
## Simple ou continu ?
| Présent simple | Présent continu |
| habitude : I play tennis on Sundays. | maintenant : I'm playing tennis now. |
| permanent : He lives in Paris. | temporaire : He's staying at a hotel. |
> Mots indices : *every day, usually, often* → simple. *now, at the moment, today, Look!, Listen!* → continu.
> Les verbes d'état ne se mettent presque jamais au continu : *like, love, hate, want, know, understand, need, believe, belong*. On dit *I know*, jamais « I'm knowing ».`,
  ex: [
    ['f', 'Listen! The baby ___. (cry)', 'is crying', 'Listen! = maintenant : présent continu.'],
    ['f', 'I ___ to work every day. (walk)', 'walk', 'every day = habitude : présent simple.'],
    ['f', 'Look! It ___. (snow)', 'is snowing', 'Look! = en ce moment.'],
    ['f', 'She ___ dinner at the moment. (cook)', 'is cooking', 'at the moment : présent continu.'],
    ['f', 'They ___ football every Saturday. (play)', 'play', 'Habitude : présent simple.'],
    ['f', 'I ___ the answer. (know)', 'know', 'know est un verbe d\'état : pas de continu.'],
    ['f', 'What ___ right now? (you / do)', 'are you doing', 'Question au continu : are + sujet + -ing.'],
    ['x', "I'm not understanding.", "I don't understand", 'understand est un verbe d\'état.'],
    ['x', 'He is play the piano.', 'He is playing the piano', 'be + verbe en -ing.'],
    ['t', 'Je suis en train de lire un livre.', 'I am reading a book', 'être en train de = be + -ing.'],
    ['t', 'Qu\'est-ce que tu fais (en ce moment) ?', 'What are you doing (right now/now/at the moment)', 'Action en cours : continu.'],
    ['t', 'Il pleut.', 'It is raining', 'Météo en ce moment : continu.'],
    ['t', 'D\'habitude je bois du thé, mais aujourd\'hui je bois du café.', "[Usually, I/I usually] drink tea, but today I'm drinking coffee", 'Habitude (simple) contre aujourd\'hui (continu).'],
  ],
},
{
  id: 'have_possessives', level: 'A1', title: 'have, have got et les possessifs',
  goal: 'Dire ce qu’on possède et à qui sont les choses.',
  body: `
## have et have got : avoir (posséder)
= I have a car. = I've got a car. // J'ai une voiture.
= She has two sisters. = She's got two sisters. // Elle a deux sœurs.
| | have | have got (surtout britannique) |
| négation | I don't have / she doesn't have | I haven't got / she hasn't got |
| question | Do you have…? / Does she have…? | Have you got…? / Has she got…? |
> *have* sert aussi pour des actions : *have breakfast, have a shower, have fun*. Là, *have got* est impossible.
## Les déterminants possessifs
| I → my | we → our |
| you → your | you → your |
| he → his | they → their |
| she → her | it → its |
> Le possessif s'accorde avec le **possesseur**, pas avec l'objet : *his mother* (sa mère, à lui), *her father* (son père, à elle).
> *its* (possessif, sans apostrophe) ≠ *it's* (= it is).
## Le génitif 's
= my brother's car // la voiture de mon frère
= my parents' house // la maison de mes parents (pluriel en -s : apostrophe seule)
= the children's room // la chambre des enfants`,
  ex: [
    ['f', 'Sarah loves ___ job. (son, à elle)', 'her', 'Possesseur féminin : her.'],
    ['f', 'Tom lives with ___ mother. (sa, à lui)', 'his', 'Possesseur masculin : his, même devant mother.'],
    ['f', 'We sold ___ old car. (notre)', 'our', 'we → our.'],
    ['f', 'The dog is eating ___ food. (sa)', 'its', 'Possesseur = une chose ou un animal : its.'],
    ['f', 'She ___ got a new bike.', 'has', 'have got : has à la 3e personne.'],
    ['f', '___ you have any brothers?', 'Do', 'have (sans got) : question avec do.'],
    ['t', 'La voiture de mon frère est rouge.', "My brother's car is red", 'Génitif : possesseur + \'s + objet.'],
    ['t', 'Elle a les yeux bleus.', 'She has (got) blue eyes', 'Pas d\'article devant blue eyes.'],
    ['t', 'Je n\'ai pas de voiture.', "I don't have a car|I haven't got a car|I have no car", 'don\'t have ou haven\'t got.'],
    ['x', 'He has got breakfast at 8.', 'He has breakfast at [8/eight]', 'have pour une action : pas de got.'],
    ['x', "It's tail is long.", 'Its tail is long', 'Possessif : its, sans apostrophe.'],
    ['t', 'C\'est la maison de mes parents.', "[This/It/That] is my parents' house", 'Pluriel en -s : apostrophe seule.'],
  ],
},
{
  id: 'there_is', level: 'A1', title: 'There is / there are, some / any',
  goal: 'Dire ce qu’il y a et parler de quantités indéfinies.',
  body: `
## There is / there are : il y a
= There is a bakery near my flat. // Il y a une boulangerie près de chez moi.
= There are two bedrooms. // Il y a deux chambres.
| | singulier / indénombrable | pluriel |
| affirmatif | there is (there's) | there are |
| négatif | there isn't | there aren't |
| question | Is there…? | Are there…? |
- Passé : *there was / there were*. Futur : *there will be*.
## some / any
- *some* : phrase affirmative (et quand on propose : *Would you like some tea?*)
- *any* : négation et questions
= There's some milk in the fridge. // Il y a du lait dans le frigo.
= There isn't any bread. // Il n'y a pas de pain.
= Are there any questions? // Y a-t-il des questions ?
> « du, de la, des » se traduisent par *some / any*, ou par rien quand on parle en général : *I eat apples every day*.`,
  ex: [
    ['f', '___ a cat on the sofa.', "There is|There's", 'Singulier : there is.'],
    ['f', '___ many people at the party yesterday.', 'There were', 'Pluriel au passé : there were.'],
    ['f', "There aren't ___ eggs left.", 'any', 'Négation : any.'],
    ['f', 'Would you like ___ coffee?', 'some', 'On propose : some, même dans une question.'],
    ['f', '___ any good restaurants near here?', 'Are there', 'Question au pluriel : Are there.'],
    ['t', 'Il y a un problème.', 'There is a problem', 'il y a = there is.'],
    ['t', 'Il n\'y a pas de lait.', "There isn't any milk|There is no milk", 'Négation + indénombrable : any ou no.'],
    ['t', 'Est-ce qu\'il y a une pharmacie près d\'ici ?', "Is there a [pharmacy/chemist's/chemist/drugstore] [near here/nearby/around here]", 'Question : Is there…?'],
    ['x', 'It has a lot of people here.', 'There are a lot of people here', 'il y a = there is/are, jamais it has.'],
    ['x', 'There is two bathrooms.', 'There are two bathrooms', 'Pluriel : there are.'],
    ['t', 'J\'ai acheté des pommes.', 'I bought (some) apples', 'des = some (ou rien).'],
  ],
},
{
  id: 'questions', level: 'A1', title: 'Poser des questions',
  goal: 'Utiliser les mots interrogatifs et le bon ordre des mots.',
  body: `
## Les mots interrogatifs
| what | quoi, quel | who | qui |
| where | où | whose | à qui |
| when | quand | which | lequel, quel (parmi un choix) |
| why | pourquoi | how | comment |
| how much | combien (indénombrable) | how many | combien (dénombrable) |
| how old | quel âge | how long | combien de temps |
| how often | à quelle fréquence | what time | à quelle heure |
## Ordre des mots : mot interrogatif + auxiliaire + sujet + verbe
= Where do you live? // Où habites-tu ?
= What is she doing? // Que fait-elle ?
= When did they arrive? // Quand sont-ils arrivés ?
> On n'inverse jamais le verbe principal : *Where do you live?* (jamais « Where live you? »).
## Quand who / what est le sujet : pas de do
= Who called you? // Qui t'a appelé ? (who = sujet)
= Who did you call? // Qui as-tu appelé ? (who = complément)
## La préposition va à la fin
= Where are you from? // D'où viens-tu ?
= Who are you talking to? // À qui parles-tu ?`,
  ex: [
    ['f', '___ old are you?', 'How', 'L\'âge : How old.'],
    ['f', '___ do you go to the gym? — Twice a week.', 'How often', 'Fréquence : How often.'],
    ['f', '___ money do you have?', 'How much', 'money est indénombrable : How much.'],
    ['f', '___ brothers do you have?', 'How many', 'brothers est dénombrable : How many.'],
    ['f', "___ is this bag? — It's mine.", 'Whose', 'À qui : Whose.'],
    ['f', '___ do you live? — In Lyon.', 'Where', 'Lieu : Where.'],
    ['t', 'Pourquoi es-tu en retard ?', 'Why are you late', 'Why + be + sujet.'],
    ['t', 'À quelle heure commence le film ?', 'What time does the [film/movie] start|When does the [film/movie] start', 'Le film = it : does + start.'],
    ['t', 'D\'où viens-tu ?', 'Where are you from|Where do you come from', 'La préposition from va à la fin.'],
    ['t', 'Qui a mangé mon gâteau ?', 'Who ate my cake|Who has eaten my cake', 'Who est sujet : pas de did.'],
    ['x', 'Where you live?', 'Where do you live', 'Il faut l\'auxiliaire do.'],
    ['x', 'What time it is?', 'What time is it', 'Inversion : is it.'],
    ['t', 'Combien de temps dure le trajet ?', 'How long does the [journey/trip] take|How long is the [journey/trip]', 'Durée : How long.'],
  ],
},
{
  id: 'can_must', level: 'A1', title: 'can, must, have to',
  goal: 'Exprimer la capacité, la permission, l’obligation et l’interdiction.',
  body: `
## can / can't : pouvoir, savoir faire
= I can swim. // Je sais nager.
= Can you help me? // Peux-tu m'aider ?
= She can't come tonight. // Elle ne peut pas venir ce soir.
- Modal : même forme à toutes les personnes (*he can*, jamais « he cans »), suivi de la base verbale **sans to**.
- Passé : *could* (*I could read when I was four*). Autres temps : *be able to* (*I will be able to come*).
## must / have to : devoir
- *must* : obligation ressentie par celui qui parle, règles écrites. *I must call my mum.*
- *have to* : obligation venant de l'extérieur. *I have to wear a uniform at work.*
- Passé des deux : *had to*.
## mustn't ≠ don't have to
| mustn't | interdiction | You mustn't smoke here. |
| don't have to | pas d'obligation | You don't have to come. |
> Piège classique : *You don't have to pay* veut dire « tu n'es pas obligé de payer » (c'est gratuit), pas « tu ne dois pas payer ».`,
  ex: [
    ['f', 'She ___ speak three languages. (sait)', 'can', 'Capacité : can.'],
    ['f', "I'm sorry, I ___ come to your party. (ne peux pas)", "can't|cannot", 'Négation : can\'t / cannot.'],
    ['f', 'He ___ work on Saturdays. (obligation imposée par son patron)', 'has to', 'Obligation extérieure : have to, has à la 3e personne.'],
    ['f', "You ___ touch that, it's dangerous! (interdiction)", "mustn't|must not", 'Interdiction : mustn\'t.'],
    ['f', "It's free, you ___ pay. (pas obligé)", "don't have to|do not have to", 'Absence d\'obligation : don\'t have to.'],
    ['f', 'Yesterday I ___ get up at five. (devoir, passé)', 'had to', 'Passé de must / have to : had to.'],
    ['x', 'He cans drive.', 'He can drive', 'Un modal ne prend jamais de -s.'],
    ['x', 'I must to go.', 'I must go', 'Pas de to après un modal.'],
    ['t', 'Tu peux m\'aider ?', 'Can you help me|Could you help me', 'Demande : Can (ou Could, plus poli).'],
    ['t', 'Je dois partir maintenant.', "I [must/have to] [go/leave] now|I've got to [go/leave] now", 'devoir : must ou have to.'],
    ['t', 'Tu n\'es pas obligé de venir.', "You don't have to come", 'Pas d\'obligation : don\'t have to.'],
    ['t', 'Je ne savais pas nager quand j\'étais petit.', "I couldn't swim when I was [little/a child/young/a kid/small]", 'Capacité passée : could.'],
  ],
},
{
  id: 'prepositions', level: 'A1', title: 'in, on, at (temps et lieu)',
  goal: 'Choisir la bonne préposition pour une heure, un jour, un lieu.',
  body: `
## Le temps
| at | heure, moment précis | at 6 o'clock, at noon, at night, at the weekend (GB) |
| on | jour, date | on Monday, on 14 July, on my birthday |
| in | mois, année, saison, partie de la journée | in June, in 2010, in winter, in the morning |
> Pas de préposition devant *this, next, last, every* : *next week, last Monday, every day*.
## Le lieu
| at | un point, un lieu d'activité | at the station, at home, at work, at school |
| in | à l'intérieur, ville, pays | in the kitchen, in Paris, in France |
| on | sur une surface, un étage | on the table, on the second floor |
= I'm at home. // Je suis à la maison.
= She lives in London. // Elle habite à Londres.
= The keys are on the table. // Les clés sont sur la table.
## Le mouvement : to
= I go to school by bus. // Je vais à l'école en bus.
> Exception : *go home* (pas de *to*). Transports : *by car, by train*, mais *on foot*.`,
  ex: [
    ['f', 'The meeting is ___ Monday.', 'on', 'Jour : on.'],
    ['f', 'I was born ___ 1998.', 'in', 'Année : in.'],
    ['f', 'The film starts ___ 8 p.m.', 'at', 'Heure : at.'],
    ['f', 'We go skiing ___ winter.', 'in', 'Saison : in.'],
    ['f', 'She is ___ work right now.', 'at', 'Lieu d\'activité : at work.'],
    ['f', 'They live ___ Spain.', 'in', 'Pays : in.'],
    ['f', 'Your phone is ___ the table.', 'on', 'Sur une surface : on.'],
    ['f', 'I usually work ___ the morning.', 'in', 'Partie de la journée : in the morning.'],
    ['x', "I'll call you on next week.", "I'll call you next week", 'Pas de préposition devant next.'],
    ['x', 'I go to home.', 'I go home', 'go home : sans to.'],
    ['t', 'Je suis né le 3 mai.', 'I was born on [3 May/May 3/the third of May/May the third/May third/3rd May/May 3rd/the 3rd of May]', 'Date : on.'],
    ['t', 'On se retrouve à la gare à midi.', "[Let's meet/See you/I'll meet you/I'll see you/We'll meet] at the station at [noon/midday/twelve]", 'Lieu précis : at ; heure : at.'],
  ],
},
{
  id: 'past_simple', level: 'A2', title: 'Le prétérit',
  goal: 'Raconter des actions terminées dans le passé.',
  body: `
Le prétérit raconte une action **terminée**, à un moment **passé** (dit ou sous-entendu).
= I visited London last year. // J'ai visité Londres l'année dernière.
= She called me yesterday. // Elle m'a appelé hier.
> Le passé composé français se traduit par un prétérit dès qu'il y a un moment passé : *yesterday, last week, in 2015, ago, when I was…*
## Verbes réguliers : -ed
- *work → worked, live → lived* (e final : +d)
- consonne + y → -ied : *study → studied* (mais *play → played*)
- doublement : *stop → stopped, plan → planned*
## Verbes irréguliers : à apprendre par cœur
*go → went, see → saw, buy → bought, have → had, make → made…* (onglet Verbes).
## Négation et question : did + base verbale
= I didn't go. // Je n'y suis pas allé.
= Did you see her? — Yes, I did. // Tu l'as vue ? — Oui.
= Where did they go? // Où sont-ils allés ?
> Après *did / didn't*, le verbe revient à la base : *Did you go?* (jamais « Did you went? »).
## ago : il y a (dans le temps)
= I met him three years ago. // Je l'ai rencontré il y a trois ans.`,
  ex: [
    ['f', 'We ___ to Italy last summer. (go)', 'went', 'go → went (irrégulier).'],
    ['f', 'She ___ a new car last month. (buy)', 'bought', 'buy → bought.'],
    ['f', 'I ___ English for two hours yesterday. (study)', 'studied', 'Consonne + y → ied.'],
    ['f', 'They ___ the bus this morning. (miss)', 'missed', 'Régulier : +ed.'],
    ['f', 'I ___ him at the party. (not / see)', "didn't see|did not see", 'didn\'t + base verbale.'],
    ['f', '___ you enjoy the film?', 'Did', 'Question au prétérit : Did.'],
    ['f', 'What ___ you do last weekend?', 'did', 'Question : What + did + sujet + base.'],
    ['x', 'Did you went to the cinema?', 'Did you go to the cinema', 'Après did : base verbale.'],
    ['x', "I didn't saw anything.", "I didn't see anything", 'Après didn\'t : base verbale.'],
    ['x', 'He buyed a new phone.', 'He bought a new phone', 'buy est irrégulier : bought.'],
    ['t', 'Je l\'ai rencontrée il y a deux ans.', 'I met her two years ago', 'il y a + durée = durée + ago.'],
    ['t', 'Qu\'est-ce que tu as mangé ce midi ?', 'What did you [eat/have] for lunch', 'Moment passé : prétérit.'],
    ['t', 'Hier, nous sommes restés à la maison.', 'Yesterday we stayed (at) home|We stayed (at) home yesterday', 'Moment passé (hier) : prétérit.'],
  ],
},
{
  id: 'past_continuous', level: 'A2', title: 'was / were et le prétérit continu',
  goal: 'Décrire une scène passée et une action interrompue.',
  body: `
## was / were : prétérit de be
| I / he / she / it | was | wasn't |
| you / we / they | were | weren't |
= I was tired yesterday. // J'étais fatigué hier.
= Were you at home? // Tu étais à la maison ?
## Prétérit continu : was / were + -ing
Il décrit une action **en cours** à un moment du passé (souvent un imparfait en français).
= At 8 p.m., I was having dinner. // À 20 h, j'étais en train de dîner.
## Continu + simple : l'action interrompue
L'action longue (continu) est interrompue par une action courte (simple).
= I was watching TV when the phone rang. // Je regardais la télé quand le téléphone a sonné.
= While she was cooking, he arrived. // Pendant qu'elle cuisinait, il est arrivé.
> L'imparfait d'**habitude** ne se traduit pas par le continu : « Quand j'étais petit, je jouais au foot » = *When I was little, I played football* (ou *I used to play*).`,
  ex: [
    ['f', 'I ___ very busy yesterday. (be)', 'was', 'I : was.'],
    ['f', 'Where ___ you last night? (be)', 'were', 'you : were.'],
    ['f', 'They ___ at the party. (not / be)', "weren't|were not", 'they : weren\'t.'],
    ['f', 'At midnight, I ___. (sleep)', 'was sleeping', 'Action en cours à un moment passé.'],
    ['f', 'She ___ a shower when I called. (have)', 'was having', 'Action longue interrompue : continu.'],
    ['f', 'I was walking home when it ___ to rain. (start)', 'started', 'Action courte qui interrompt : prétérit simple.'],
    ['f', 'What ___ at 10 p.m. yesterday? (you / do)', 'were you doing', 'Question au prétérit continu.'],
    ['x', 'We was happy.', 'We were happy', 'we : were.'],
    ['x', 'I was read when he came.', 'I was reading when he came', 'was + -ing.'],
    ['t', 'Il faisait beau.', 'The weather was [nice/good/lovely/beautiful]|It was [nice/sunny/a nice day/a beautiful day/lovely]', 'Description passée : was.'],
    ['t', 'Je dormais quand tu as appelé.', 'I was [sleeping/asleep] when you called', 'Continu (action longue) + simple (interruption).'],
    ['t', 'Pendant que je cuisinais, elle lisait.', 'While I was cooking, she was reading', 'Deux actions en cours en même temps : deux continus.'],
  ],
},
{
  id: 'future', level: 'A2', title: 'Le futur : will, going to, présent continu',
  goal: 'Choisir la bonne forme pour parler de l’avenir.',
  body: `
## will : décision sur le moment, prédiction, promesse
= I'll help you. // Je vais t'aider. (décidé à l'instant)
= It will rain tomorrow. // Il pleuvra demain.
= I won't tell anyone. // Je ne le dirai à personne.
## be going to : intention, prédiction évidente
= I'm going to study medicine. // Je vais faire médecine. (décidé avant)
= Look at those clouds! It's going to rain. // Il va pleuvoir.
## Présent continu : rendez-vous, plans organisés
= I'm meeting Tom tonight. // Je vois Tom ce soir.
= We're flying to Rome on Friday. // On prend l'avion pour Rome vendredi.
| will | The phone's ringing. — I'll get it! | décidé à l'instant |
| going to | I'm going to buy a car. | décidé avant |
| présent continu | I'm buying it on Saturday. | organisé, prévu |
> Après *when, as soon as, before, after, until* : présent, jamais *will*. *I'll call you when I arrive* (jamais « when I will arrive »).`,
  ex: [
    ['f', '"It\'s cold in here." "OK, I ___ the window." (close)', "'ll close|will close", 'Décision prise sur le moment : will.'],
    ['f', 'Look at the sky! It ___ rain. (va)', 'is going to', 'Prédiction évidente : going to.'],
    ['f', "I've decided: I ___ learn Japanese. (projet)", 'am going to', 'Intention décidée avant : going to.'],
    ['f', 'I promise I ___ be late. (ne… pas)', "won't|will not", 'Promesse : will ; négation won\'t.'],
    ['f', "I'll call you when I ___ home. (get)", 'get', 'Après when : présent.'],
    ['f', "We ___ Paul for dinner tonight, it's all organised. (meet)", 'are meeting', 'Rendez-vous organisé : présent continu.'],
    ['x', 'I will call you when I will arrive.', 'I will call you when I arrive', 'Après when : présent.'],
    ['t', 'Je pense qu\'il va gagner.', 'I think he [will/is going to] win', 'Prédiction : will (ou going to).'],
    ['t', 'Qu\'est-ce que tu fais ce week-end ?', 'What are you doing this weekend|What are you going to do this weekend|What will you do this weekend', 'Projet : présent continu ou going to.'],
    ['t', 'Je t\'aiderai demain.', 'I will help you tomorrow', 'Futur simple : will.'],
    ['t', 'Ça ne marchera pas.', "[It/That] won't work", 'Prédiction négative : won\'t.'],
  ],
},
{
  id: 'comparisons', level: 'A2', title: 'Comparatifs et superlatifs',
  goal: 'Comparer des choses et des personnes.',
  body: `
## Adjectifs courts (1 syllabe, ou 2 syllabes en -y)
| tall | taller than | the tallest |
| big | bigger than | the biggest |
| nice | nicer than | the nicest |
| happy | happier than | the happiest |
## Adjectifs longs (2 syllabes ou plus)
| expensive | more expensive than | the most expensive |
| interesting | more interesting than | the most interesting |
## Irréguliers
| good | better | the best |
| bad | worse | the worst |
| far | further / farther | the furthest / farthest |
## Autres structures
= She's as tall as her brother. // Elle est aussi grande que son frère.
= It's not as cold as yesterday. // Il fait moins froid qu'hier.
= It's getting colder and colder. // Il fait de plus en plus froid.
= The more you practise, the better you get. // Plus tu t'entraînes, plus tu progresses.
> Une seule marque : *bigger* ou *more expensive*, jamais « more bigger ».
> « que » après un comparatif = *than*. Après un superlatif, « du monde » = *in the world*.`,
  ex: [
    ['f', 'My sister is ___ than me. (old)', 'older', 'Adjectif court : -er.'],
    ['f', 'This hotel is ___ than the other one. (expensive)', 'more expensive', 'Adjectif long : more.'],
    ['f', 'Today is ___ day of the year. (hot)', 'the hottest', 'Superlatif court : the + -est (t doublé).'],
    ['f', 'Your English is ___ than mine. (good)', 'better', 'good → better.'],
    ['f', "This is ___ film I've ever seen. (bad)", 'the worst', 'bad → the worst.'],
    ['f', 'She is ___ than her brother. (happy)', 'happier', 'y → ier.'],
    ['f', 'He is as tall ___ his father.', 'as', 'Égalité : as … as.'],
    ['x', 'This exercise is more easier.', 'This exercise is easier', 'easy → easier, sans more.'],
    ['x', 'He is taller that me.', 'He is taller than [me/I am]', 'Comparatif + than.'],
    ['t', 'C\'est la plus belle ville du monde.', '[It/This] is the most beautiful city in the world', 'Superlatif long ; du monde = in the world.'],
    ['t', 'Le train est plus rapide que le bus.', 'The train is [faster/quicker] than the bus', 'fast → faster.'],
    ['t', 'Plus tôt, mieux c\'est.', 'The [sooner/earlier], the better', 'The + comparatif, the + comparatif.'],
  ],
},
{
  id: 'quantities', level: 'A2', title: 'much, many, a lot of, few, little',
  goal: 'Parler de quantités avec les noms dénombrables et indénombrables.',
  body: `
## Dénombrable ou indénombrable ?
- Dénombrables : on peut compter (*one apple, two apples*).
- Indénombrables : pas de pluriel, pas de *a / an*, verbe au singulier : *water, money, information, advice, news, furniture, luggage, homework, bread, work, hair*.
> *information, advice, news* sont indénombrables : *some advice* (des conseils), *a piece of advice* (un conseil), *The news is good*.
## Quantités
| | dénombrable | indénombrable |
| beaucoup (question, négation) | many | much |
| beaucoup (affirmatif) | a lot of | a lot of |
| peu (pas assez) | few | little |
| un peu, quelques | a few | a little |
| combien | how many | how much |
= I don't have much time. // Je n'ai pas beaucoup de temps.
= There were a lot of people. // Il y avait beaucoup de monde.
= I have a few friends in London. // J'ai quelques amis à Londres.
= Few people know this. // Peu de gens le savent.`,
  ex: [
    ['f', 'How ___ sugar do you want?', 'much', 'sugar est indénombrable.'],
    ['f', 'How ___ people came?', 'many', 'people est dénombrable (pluriel).'],
    ['f', "I don't have ___ money.", 'much', 'Négation + indénombrable : much.'],
    ['f', 'There are ___ tourists here in summer. (beaucoup, affirmatif)', 'a lot of|lots of', 'Affirmatif : a lot of.'],
    ['f', 'Can I give you a piece of ___? (conseil)', 'advice', 'advice est indénombrable : a piece of advice.'],
    ['f', 'I need ___ information about the course.', 'some', 'information est indénombrable : some.'],
    ['f', 'Only ___ students passed the exam; it was really hard. (peu)', 'a few|few', 'Dénombrable : few.'],
    ['x', 'She gave me good advices.', 'She gave me (some) good advice', 'advice n\'a pas de pluriel.'],
    ['x', 'The news are bad.', 'The news is bad', 'news est singulier.'],
    ['x', 'I have many homeworks.', 'I have [a lot of/lots of] homework', 'homework est indénombrable.'],
    ['t', 'J\'ai besoin d\'un peu de temps.', 'I need [a little/a bit of/some] time', 'un peu de + indénombrable : a little.'],
    ['t', 'Il y a peu d\'espoir.', "There is little hope|There isn't much hope", 'peu de + indénombrable : little.'],
    ['t', 'Nos bagages sont lourds.', 'Our luggage is heavy', 'luggage est indénombrable : verbe au singulier.'],
  ],
},
{
  id: 'word_order', level: 'A2', title: 'Adverbes de fréquence et ordre des mots',
  goal: 'Placer correctement always, never… et construire une phrase dans le bon ordre.',
  body: `
## Les adverbes de fréquence
| always | toujours |
| usually | d'habitude |
| often | souvent |
| sometimes | parfois |
| rarely / seldom | rarement |
| never | jamais |
## Leur place
- **avant** le verbe principal : *I often go to the cinema.*
- **après** *be* : *She is always late.*
- **entre** l'auxiliaire et le verbe : *I have never been to Japan. I don't usually eat meat.*
## Ordre de base : sujet + verbe + complément + lieu + temps
= I met my friends in town yesterday. // J'ai vu mes amis en ville hier.
> Le complément d'objet reste collé au verbe : *I speak English very well* (jamais « I speak very well English »).
> On ne glisse rien entre le verbe et son complément : *I really like music* (jamais « I like really music »).
## Expressions de fréquence : en fin de phrase
*every day, once a week, twice a month, three times a year*`,
  ex: [
    ['r', 'Ajoute « always » au bon endroit', 'She is late.', 'She is always late', 'Après be.'],
    ['r', 'Ajoute « often » au bon endroit', 'I go to the gym.', 'I often go to the gym', 'Avant le verbe principal.'],
    ['r', 'Ajoute « never » au bon endroit', 'He has seen snow.', 'He has never seen snow', 'Entre l\'auxiliaire et le participe.'],
    ['r', 'Ajoute « usually » au bon endroit', "We don't eat meat.", "We don't usually eat meat|We usually don't eat meat", 'Après l\'auxiliaire (ou juste avant).'],
    ['x', 'I speak very well English.', 'I speak English very well', 'Le complément reste collé au verbe.'],
    ['x', 'She drinks every day coffee.', 'She drinks coffee every day', 'L\'expression de temps va en fin de phrase.'],
    ['x', 'I like very much chocolate.', 'I like chocolate very much|I really like chocolate', 'very much se place après le complément.'],
    ['t', 'Je vais à la piscine deux fois par semaine.', 'I go to the (swimming) pool twice a week|I go swimming twice a week', 'deux fois par semaine = twice a week, en fin de phrase.'],
    ['t', 'Il ne se plaint jamais.', 'He never complains', 'never avant le verbe ; pas d\'autre négation.'],
    ['t', 'Tu es toujours fatigué.', 'You are always tired', 'Après be.'],
    ['t', 'Je vois rarement mes cousins.', "I [rarely/seldom] see my cousins|I don't often see my cousins", 'Avant le verbe principal.'],
  ],
},
{
  id: 'present_perfect', level: 'A2', title: 'Le present perfect',
  goal: 'Parler d’expériences et de résultats présents d’actions passées.',
  body: `
Le present perfect (*have / has + participe passé*) relie le passé au **présent**. On ne dit pas **quand** : ce qui compte, c'est le résultat ou l'expérience.
= I have visited London three times. // J'ai visité Londres trois fois (dans ma vie).
= She has lost her keys. // Elle a perdu ses clés (elle ne les a toujours pas).
## Formation
| I / you / we / they | have ('ve) + participe | haven't + participe |
| he / she / it | has ('s) + participe | hasn't + participe |
Question : *Have you finished? Has she called?*
## Les petits mots qui vont avec
| ever | déjà (au cours de ta vie ?) | Have you ever been to Spain? |
| never | jamais | I've never eaten sushi. |
| just | venir de | I've just arrived. (Je viens d'arriver.) |
| already | déjà | She has already left. |
| yet | pas encore / déjà (question) | I haven't finished yet. Have you finished yet? |
> *been* ou *gone* : *She has been to Rome* (elle y est allée et elle est revenue) ; *She has gone to Rome* (elle y est en ce moment).
> Avec un moment passé précis (*yesterday, last year, in 2010, ago*), le present perfect est **impossible** : *I saw him yesterday*.`,
  ex: [
    ['f', 'I ___ sushi. (never / eat)', 'have never eaten', 'have + never + participe passé.'],
    ['f', '___ you ever been to New York?', 'Have', 'Question : Have + sujet + participe.'],
    ['f', 'She ___ home. (just / arrive)', 'has just arrived', 'venir de = have just + participe.'],
    ['f', "I haven't finished my homework ___.", 'yet', 'Négation + pas encore : yet, en fin de phrase.'],
    ['f', "They have ___ seen this film, they don't want to watch it again. (déjà)", 'already', 'déjà (affirmatif) : already.'],
    ['f', "He ___ his phone. He can't find it anywhere. (lose)", 'has lost', 'Résultat présent : present perfect.'],
    ['f', '"Where is Anna?" "She ___ to the shop." (go — elle y est encore)', 'has gone', 'Elle n\'est pas revenue : gone.'],
    ['x', 'I have seen him yesterday.', 'I saw him yesterday', 'yesterday = moment précis : prétérit.'],
    ['x', 'Have you ever went to Italy?', 'Have you ever been to Italy', 'Participe passé : been (ou gone).'],
    ['t', 'Je viens de finir.', 'I have just finished|I just finished', 'venir de = have just.'],
    ['t', 'Tu as déjà mangé des escargots ?', 'Have you ever eaten snails', 'Expérience : Have you ever…?'],
    ['t', 'Elle n\'a pas encore appelé.', "She hasn't [called/phoned/rung] yet", 'pas encore = not… yet.'],
    ['t', 'Je n\'ai jamais pris l\'avion.', 'I have never [flown/taken a plane/been on a plane/travelled by plane]', 'Expérience de vie : present perfect + never.'],
  ],
},
{
  id: 'make_do', level: 'A2', title: 'make ou do, say ou tell',
  goal: 'Ne plus confondre ces verbes qui se traduisent pareil en français.',
  body: `
## make : fabriquer, créer, produire un résultat
*make a cake, make a mistake, make a decision, make money, make a noise, make friends, make a phone call, make the bed*
## do : faire une activité, une tâche, un travail
*do homework, do the shopping, do the washing-up, do sport, do exercise, do your best, do a job, do someone a favour*
= I made a mistake. // J'ai fait une erreur.
= Can you do me a favour? // Tu peux me rendre un service ?
> Astuce : si on peut demander « qu'est-ce que ça a produit ? », c'est souvent *make*. Pour une tâche ou une activité vague (*do something, do nothing*), c'est *do*.
## say ou tell : dire
- *say* + paroles (ou *say something to someone*) : *She said hello. He said that he was tired.*
- *tell* + **personne** : *She told me the truth. Tell him to come.*
= He said (that) he was busy. // Il a dit qu'il était occupé.
= He told me (that) he was busy. // Il m'a dit qu'il était occupé.
> On ne dit jamais « say me » : *tell me* ou *say to me*.
> Expressions fixes avec *tell* : *tell the truth, tell a lie, tell a story, tell a joke, tell the time*.`,
  ex: [
    ['f', 'Everybody ___ mistakes. (faire, présent)', 'makes', 'make a mistake.'],
    ['f', 'I need to ___ my homework.', 'do', 'do homework.'],
    ['f', 'Can you ___ me a favour?', 'do', 'do someone a favour.'],
    ['f', 'She ___ a decision very quickly. (prétérit)', 'made', 'make a decision.'],
    ['f', 'We ___ the shopping on Saturdays.', 'do', 'do the shopping.'],
    ['f', 'He ___ me a funny story. (prétérit)', 'told', 'tell a story.'],
    ['f', 'She ___ goodbye and left. (prétérit)', 'said', 'say + paroles.'],
    ['f', "Don't ___ lies!", 'tell', 'tell a lie.'],
    ['x', 'He said me that he was tired.', 'He told me (that) he was tired|He said (that) he was tired', 'tell + personne ; say sans personne.'],
    ['x', 'I did a cake for your birthday.', 'I made a cake for your birthday', 'Fabriquer : make.'],
    ['t', 'Il ne fait jamais la vaisselle.', 'He never [does the washing-up/does the dishes/washes the dishes/washes up]', 'do the washing-up / do the dishes.'],
    ['t', 'Dis-moi la vérité.', 'Tell me the truth', 'tell the truth.'],
    ['t', 'Ce n\'est pas grave, fais de ton mieux.', "It doesn't matter, [just do/do] your best|Never mind, [just do/do] your best|Don't worry, [just do/do] your best", 'do your best.'],
  ],
},
];
