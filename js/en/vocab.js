// Vocabulaire par thème. Une ligne : anglais ; français ; exemple [; remarque]
// Anglais : « a|b » = deux réponses acceptées (la première est affichée), « (x) » = facultatif.
// Français : ce qui est entre parenthèses précise le sens attendu.
// L'identifiant d'un mot est « thème.mot » : ne pas renommer un thème ni le premier mot anglais d'une ligne
// (la progression de l'élève y est attachée).

const T = (id, name, level, text) => ({
  id, name, level,
  words: text.trim().split('\n').map((l) => {
    const [en, fr, ex, note] = l.split(';').map((x) => x.trim());
    return { id: `${id}.${en.split('|')[0].replace(/[^a-z0-9]+/gi, '_').toLowerCase()}`, en, fr, ex, note: note || '' };
  }),
});

export const THEMES = [
T('basics', 'Les essentiels', 'A1', `
hello|hi ; bonjour, salut ; Hello, my name is Sarah.
goodbye|bye ; au revoir ; Goodbye, see you tomorrow!
please ; s'il te plaît, s'il vous plaît ; Can I have some water, please?
thank you|thanks ; merci ; Thank you for your help.
you're welcome ; de rien ; "Thanks a lot!" "You're welcome."
sorry ; désolé, pardon ; Sorry, I'm late.
excuse me ; excusez-moi (pour interpeller) ; Excuse me, where is the station?
yes ; oui ; Yes, I agree with you.
no ; non ; No, I don't want any sugar.
maybe|perhaps ; peut-être ; Maybe we can meet on Friday.
of course ; bien sûr ; Of course you can come with us.
good morning ; bonjour (le matin) ; Good morning! Did you sleep well?
good evening ; bonsoir ; Good evening, ladies and gentlemen.
good night ; bonne nuit ; Good night, sleep well.
see you later ; à plus tard ; I have to go now. See you later!
name ; nom, prénom ; What's your name?
friend ; ami, amie ; She is my best friend.
man ; homme ; That man is my neighbour.
woman ; femme ; The woman in the red coat is a doctor.
child ; enfant ; Every child needs love. ; Pluriel irrégulier : children.
people ; les gens ; Many people work from home now. ; « people » est pluriel : people are…
thing ; chose ; I have a lot of things to do today.
everything ; tout (toutes les choses) ; Everything is ready.
nothing ; rien ; There is nothing in the fridge.
something ; quelque chose ; I want to tell you something.
someone|somebody ; quelqu'un ; Someone is knocking at the door.
`),
T('numbers', 'Nombres et quantités', 'A1', `
eleven ; onze ; The shop opens at eleven.
twelve ; douze ; There are twelve months in a year.
thirteen ; treize ; My little brother is thirteen.
fifteen ; quinze ; The film starts in fifteen minutes.
twenty ; vingt ; I paid twenty euros for this shirt.
thirty ; trente ; It's thirty degrees today!
forty ; quarante ; My father is forty. ; Attention : forty, sans « u ».
fifty ; cinquante ; About fifty people came to the party.
hundred ; cent ; This book has three hundred pages. ; Pas de « s » : three hundred.
thousand ; mille ; The city has ten thousand inhabitants.
million ; million ; Two million people live here.
first ; premier ; This is my first time in London.
second ; deuxième, second ; Take the second street on the left.
third ; troisième ; She finished third in the race.
half ; moitié, demi ; I'll be back in half an hour.
twice ; deux fois ; I go to the gym twice a week.
number ; nombre, numéro ; What's your phone number?
a lot of|lots of ; beaucoup de ; She has a lot of friends.
a few ; quelques (dénombrable) ; I have a few questions.
a little|a bit ; un peu ; I speak a little English.
enough ; assez ; We don't have enough time.
too much ; trop (indénombrable) ; You drink too much coffee.
too many ; trop (dénombrable) ; There are too many cars in the city.
`),
T('time', 'Le temps et les dates', 'A1', `
day ; jour, journée ; Have a nice day!
week ; semaine ; I work five days a week.
month ; mois ; We moved here last month.
year ; année, an ; She is twenty years old.
today ; aujourd'hui ; What are you doing today?
tomorrow ; demain ; See you tomorrow.
yesterday ; hier ; I saw him yesterday.
morning ; matin, matinée ; I run every morning.
afternoon ; après-midi ; Let's meet in the afternoon.
evening ; soir, soirée ; We usually eat at seven in the evening.
night ; nuit ; I couldn't sleep last night.
hour ; heure (durée) ; The trip takes two hours.
minute ; minute ; Wait a minute, please.
Monday ; lundi ; The shop is closed on Mondays. ; Les jours prennent une majuscule en anglais.
Tuesday ; mardi ; I have a meeting on Tuesday.
Wednesday ; mercredi ; Wednesday is my day off.
Thursday ; jeudi ; The exam is on Thursday.
Friday ; vendredi ; We go out on Friday nights.
Saturday ; samedi ; I sleep late on Saturdays.
Sunday ; dimanche ; We have lunch with my parents every Sunday.
weekend ; week-end ; What did you do at the weekend?
spring ; printemps ; The flowers come out in spring.
summer ; été ; We go to the beach every summer.
autumn|fall ; automne ; The leaves turn red in autumn.
winter ; hiver ; It snows a lot in winter.
now ; maintenant ; I'm busy now. Can I call you back?
soon ; bientôt ; See you soon!
late ; en retard, tard ; Don't be late for school.
early ; tôt, en avance ; I get up early during the week.
`),
T('family', 'La famille', 'A1', `
mother|mum|mom ; mère, maman ; My mother is a teacher.
father|dad ; père, papa ; My father loves cooking.
parents ; parents (père et mère) ; My parents live in Lyon. ; « parents » = père et mère seulement ; la famille élargie = relatives.
brother ; frère ; I have two older brothers.
sister ; sœur ; My sister is three years younger than me.
son ; fils ; Their son is at university.
daughter ; fille (enfant) ; They have a daughter and two sons.
husband ; mari ; Her husband works in a bank.
wife ; épouse, femme (mariée) ; His wife is from Spain.
grandmother|grandma ; grand-mère ; My grandmother makes great cakes.
grandfather|grandpa ; grand-père ; My grandfather was a farmer.
grandchildren ; petits-enfants ; They have five grandchildren.
uncle ; oncle ; My uncle lives in Canada.
aunt ; tante ; My aunt has a big dog.
cousin ; cousin, cousine ; I spent the summer with my cousins.
nephew ; neveu ; My nephew is starting school this year.
niece ; nièce ; My niece wants to be a vet.
baby ; bébé ; The baby is sleeping.
boyfriend ; petit ami, copain ; Her boyfriend is really nice.
girlfriend ; petite amie, copine ; He met his girlfriend at work.
relatives ; membres de la famille, proches ; We visit our relatives at Christmas.
married ; marié ; They got married last year.
single ; célibataire ; Are you single or married?
divorced ; divorcé ; My parents are divorced.
twins ; jumeaux, jumelles ; My cousins are twins.
`),
T('body', 'Le corps', 'A1', `
head ; tête ; My head hurts.
hair ; cheveux ; She has long dark hair. ; « hair » est indénombrable : her hair is long.
face ; visage ; Wash your face before bed.
eye ; œil ; He has blue eyes.
ear ; oreille ; Cats have very good ears.
nose ; nez ; My nose is red because of the cold.
mouth ; bouche ; Don't talk with your mouth full.
tooth ; dent ; I brush my teeth twice a day. ; Pluriel irrégulier : teeth.
neck ; cou ; She wears a scarf around her neck.
shoulder ; épaule ; He put his hand on my shoulder.
arm ; bras ; I broke my arm when I was ten.
hand ; main ; Raise your hand if you know the answer.
finger ; doigt ; I cut my finger while cooking.
back ; dos ; I have a pain in my back.
stomach ; ventre, estomac ; My stomach hurts after lunch.
leg ; jambe ; My legs are tired after the run.
knee ; genou ; He hurt his knee playing football.
foot ; pied ; I go to work on foot. ; Pluriel irrégulier : feet.
toe ; orteil ; I hit my toe on the table.
heart ; cœur ; Your heart beats faster when you run.
skin ; peau ; She has very sensitive skin.
blood ; sang ; They need blood donors.
bone ; os ; The dog is eating a bone.
brain ; cerveau ; The brain needs sleep.
chest ; poitrine, torse ; He has a pain in his chest.
`),
T('home', 'La maison', 'A1', `
house ; maison ; They live in a big house.
flat|apartment ; appartement ; I rent a small flat in the city centre.
room ; pièce, chambre ; The flat has three rooms.
kitchen ; cuisine (pièce) ; We eat in the kitchen.
bedroom ; chambre ; My bedroom is upstairs.
bathroom ; salle de bains ; The bathroom is next to my room.
living room ; salon ; We watch TV in the living room.
garden ; jardin ; The children are playing in the garden.
door ; porte ; Please close the door.
window ; fenêtre ; Can you open the window?
wall ; mur ; There's a picture on the wall.
floor ; sol, étage ; The keys are on the floor. I live on the second floor.
ceiling ; plafond ; The ceiling is very high.
stairs ; escalier ; Go up the stairs and turn left.
roof ; toit ; There's a cat on the roof.
bed ; lit ; I go to bed at eleven.
table ; table ; Dinner is on the table.
chair ; chaise ; Take a chair and sit down.
sofa|couch ; canapé ; He fell asleep on the sofa.
fridge ; frigo, réfrigérateur ; Put the milk in the fridge.
oven ; four ; The cake is in the oven.
shower ; douche ; I take a shower every morning.
key ; clé ; I can't find my keys.
neighbour ; voisin, voisine ; Our neighbours are very friendly.
rent ; loyer ; The rent is very high in Paris.
`),
T('food', 'Manger et boire', 'A1', `
bread ; pain ; I buy fresh bread every morning.
water ; eau ; Can I have a glass of water?
milk ; lait ; Do you take milk in your coffee?
coffee ; café ; I drink two cups of coffee a day.
tea ; thé ; Would you like some tea?
juice ; jus ; I'll have an orange juice, please.
meat ; viande ; I don't eat meat.
chicken ; poulet ; We're having chicken for dinner.
fish ; poisson ; Fish is good for your health.
egg ; œuf ; I had two eggs for breakfast.
cheese ; fromage ; France is famous for its cheese.
butter ; beurre ; Can you pass me the butter?
rice ; riz ; Cook the rice for ten minutes.
pasta ; pâtes ; Pasta is quick and easy to cook. ; Indénombrable : pasta is…
vegetables ; légumes ; You should eat more vegetables.
fruit ; fruit(s) ; I eat fruit every day.
apple ; pomme ; An apple a day keeps the doctor away.
potato ; pomme de terre ; Peel the potatoes first. ; Pluriel : potatoes.
sugar ; sucre ; No sugar for me, thanks.
salt ; sel ; This soup needs more salt.
breakfast ; petit-déjeuner ; What do you have for breakfast?
lunch ; déjeuner ; Let's have lunch together.
dinner ; dîner ; Dinner is ready!
hungry ; avoir faim (affamé) ; I'm hungry. Let's eat. ; On dit « I'm hungry », avec be.
thirsty ; avoir soif (assoiffé) ; I'm thirsty. Is there any water?
delicious ; délicieux ; This cake is delicious!
`),
T('clothes', 'Les vêtements', 'A1', `
clothes ; vêtements ; I need new clothes for work.
shirt ; chemise ; He's wearing a white shirt.
T-shirt ; tee-shirt ; I bought a T-shirt at the concert.
trousers|pants ; pantalon ; These trousers are too long. ; Toujours pluriel : my trousers are… (pants = pantalon en américain, slip en anglais britannique)
jeans ; jean ; She always wears jeans.
dress ; robe ; What a beautiful dress!
skirt ; jupe ; She's wearing a short skirt.
jacket ; veste, blouson ; Take a jacket, it's cold.
coat ; manteau ; Put your coat on, we're leaving.
jumper|sweater ; pull ; My grandmother knitted this jumper.
shoes ; chaussures ; These shoes are very comfortable.
boots ; bottes ; I need boots for the winter.
socks ; chaussettes ; I can't find a pair of socks.
hat ; chapeau, bonnet ; Wear a hat in the sun.
scarf ; écharpe, foulard ; It's freezing, take your scarf.
gloves ; gants ; I lost my gloves on the bus.
belt ; ceinture ; This belt is too tight.
tie ; cravate ; He wears a tie to work.
bag ; sac ; Don't forget your bag.
pocket ; poche ; My phone is in my pocket.
glasses ; lunettes ; I can't read without my glasses.
size ; taille, pointure ; What size are you?
to wear ; porter (un vêtement) ; She often wears black.
to try on ; essayer (un vêtement) ; Can I try on this jacket?
`),
T('adjectives1', 'Adjectifs essentiels', 'A1', `
good ; bon, bien ; This is a good idea.
bad ; mauvais ; The weather is bad today.
big ; grand, gros ; They have a big dog.
small|little ; petit ; I live in a small village.
tall ; grand (personne, bâtiment) ; My brother is very tall.
short ; court, petit (de taille) ; She has short hair.
long ; long ; It's a long story.
new ; nouveau, neuf ; I bought a new phone.
old ; vieux, âgé, ancien ; This is a very old house.
young ; jeune ; He is too young to drive.
happy ; heureux, content ; I'm happy to see you.
sad ; triste ; Why are you sad?
tired ; fatigué ; I'm tired after work.
easy ; facile ; The test was easy.
difficult|hard ; difficile ; English isn't that difficult.
cheap ; bon marché, pas cher ; This restaurant is cheap.
expensive ; cher ; London is an expensive city.
beautiful ; beau, belle ; What a beautiful view!
ugly ; laid, moche ; That building is really ugly.
hot ; chaud (très) ; It's hot today.
cold ; froid ; Your hands are cold.
fast|quick ; rapide ; This train is very fast.
slow ; lent ; The internet is slow today.
clean ; propre ; The kitchen is clean.
dirty ; sale ; Your shoes are dirty.
full ; plein ; The bus is full.
empty ; vide ; The fridge is empty.
busy ; occupé ; I'm busy this afternoon.
free ; libre, gratuit ; Are you free tonight? Entry is free.
same ; même (identique) ; We have the same phone.
`),
T('colours', 'Couleurs', 'A1', `
colour ; couleur ; What's your favourite colour?
red ; rouge ; She has a red car.
blue ; bleu ; The sky is blue.
green ; vert ; I love green tea.
yellow ; jaune ; Bananas are yellow.
black ; noir ; I want a black coffee.
white ; blanc ; He's wearing a white shirt.
grey|gray ; gris ; The sky is grey today.
brown ; marron, brun ; He has brown eyes.
pink ; rose ; She painted her room pink.
purple ; violet ; Purple is my sister's favourite colour.
orange ; orange ; I'd like an orange juice, please.
dark ; foncé, sombre ; She has dark hair. It's dark outside.
light ; clair ; I want a light blue shirt.
`),
T('city', 'La ville', 'A1', `
town ; ville (petite) ; I grew up in a small town.
city ; ville (grande) ; New York is a huge city.
street ; rue ; I live in a quiet street.
road ; route ; Be careful when you cross the road.
shop|store ; magasin ; The shops close at seven.
supermarket ; supermarché ; I go to the supermarket on Saturdays.
bank ; banque ; The bank is next to the post office.
post office ; bureau de poste ; Where is the post office?
station ; gare ; The train leaves the station at nine.
airport ; aéroport ; It takes an hour to get to the airport.
church ; église ; There's an old church in the village.
park ; parc ; Let's go for a walk in the park.
museum ; musée ; The museum is free on Sundays.
restaurant ; restaurant ; We had dinner in a Thai restaurant.
hotel ; hôtel ; Our hotel is near the beach.
bus ; bus ; I take the bus to work.
train ; train ; The train is late again.
car ; voiture ; Where did you park the car?
bike|bicycle ; vélo ; I go to university by bike.
underground|subway|metro ; métro ; The underground is the fastest way to travel in London.
ticket ; billet, ticket ; I bought two tickets for the concert.
map ; carte, plan ; Can you show me on the map?
corner ; coin ; The bakery is on the corner.
traffic lights ; feux (de circulation) ; Turn right at the traffic lights.
traffic ; circulation ; There's a lot of traffic this morning.
bridge ; pont ; Cross the bridge and turn left.
square ; place (en ville) ; The market is in the main square.
building ; bâtiment, immeuble ; I work in that tall building.
`),
T('routine', 'Une journée', 'A1', `
to wake up ; se réveiller ; I wake up at seven every day.
to get up ; se lever ; I get up at seven fifteen.
to have a shower ; prendre une douche ; I have a shower before breakfast.
to get dressed ; s'habiller ; Hurry up and get dressed!
to brush your teeth ; se brosser les dents ; Don't forget to brush your teeth.
to have breakfast ; prendre le petit-déjeuner ; We have breakfast at eight.
to go to work ; aller au travail ; I go to work by train.
to come home|to get home ; rentrer à la maison ; What time do you usually get home?
to cook ; cuisiner, faire à manger ; My dad cooks every evening.
to do the shopping ; faire les courses ; I do the shopping on Saturday mornings.
to do the washing-up|to do the dishes ; faire la vaisselle ; It's your turn to do the washing-up.
to go to bed ; aller se coucher ; I usually go to bed at eleven.
to fall asleep ; s'endormir ; I fell asleep in front of the TV.
to rest ; se reposer ; You should rest a little.
to hurry (up) ; se dépêcher ; Hurry up, we're late!
to wait for ; attendre (quelqu'un) ; I'm waiting for the bus. ; Avec « for » devant le complément : wait for someone.
to look for ; chercher ; I'm looking for my glasses.
to find ; trouver ; I can't find my keys.
to need ; avoir besoin de ; I need a new computer.
to forget ; oublier ; Don't forget your umbrella.
to remember ; se souvenir de, se rappeler ; I don't remember his name.
to begin|to start ; commencer ; The lesson starts at nine.
to finish|to end ; finir, terminer ; I finish work at six.
to leave ; partir, quitter ; I leave home at eight.
to arrive ; arriver ; We arrived in London at noon. ; arrive in (ville, pays), arrive at (lieu précis).
to take ; prendre ; Take an umbrella, it's going to rain.
`),
T('school', 'Études', 'A2', `
school ; école ; My little sister started school this year.
university ; université ; I study computer science at university.
student ; étudiant, élève ; There are thirty students in my class.
teacher ; professeur, enseignant ; Our teacher is very patient.
lesson ; leçon, cours ; The lesson lasts one hour.
homework ; devoirs ; I have a lot of homework tonight. ; Indénombrable : no « homeworks ».
exam ; examen ; The exam is next week.
to pass (an exam) ; réussir (un examen) ; I passed my driving test! ; Faux ami : « passer un examen » = take an exam.
to fail ; échouer, rater ; He failed his maths exam.
to take an exam ; passer un examen ; I'm taking my exam on Monday.
mark|grade ; note ; I got a good mark in English.
subject ; matière ; What's your favourite subject?
maths|math ; mathématiques ; Maths was my best subject.
history ; histoire (matière) ; I love history.
degree ; diplôme (universitaire) ; She has a degree in law.
notebook ; cahier, carnet ; Write it in your notebook.
pen ; stylo ; Can I borrow your pen?
pencil ; crayon ; Write your name in pencil.
dictionary ; dictionnaire ; Look it up in the dictionary.
mistake ; erreur, faute ; Everyone makes mistakes.
question ; question ; Can I ask you a question?
answer ; réponse ; I don't know the answer.
timetable|schedule ; emploi du temps, horaires ; Check the timetable for the next train.
library ; bibliothèque ; I study at the library. ; Faux ami : librairie = bookshop.
to learn ; apprendre ; I'm learning English.
to revise|to review ; réviser ; I need to revise for my exam.
`),
T('work', 'Le travail', 'A2', `
job ; emploi, poste ; She's looking for a new job.
work ; travail ; I have a lot of work this week. ; « work » est indénombrable ; un emploi = a job.
office ; bureau (lieu) ; I work in an office.
boss ; patron, chef ; My boss is on holiday.
colleague ; collègue ; I have lunch with my colleagues.
company ; entreprise, société ; He works for a big company.
meeting ; réunion ; I have a meeting at ten.
salary ; salaire ; The salary is good.
interview ; entretien ; I have a job interview tomorrow.
CV|résumé ; CV ; Send us your CV.
to apply for ; postuler à ; I applied for a job in London.
to hire ; embaucher ; They hired three new people.
to fire|to sack ; licencier, renvoyer ; He was fired last month.
employee ; employé, salarié ; The company has two hundred employees.
customer|client ; client ; The customer is always right.
skill ; compétence ; Communication is an important skill.
experience ; expérience ; Do you have any experience in sales?
full-time ; à temps plein ; She works full-time.
part-time ; à temps partiel ; I have a part-time job.
retired ; à la retraite ; My grandparents are retired.
unemployed ; au chômage ; He's been unemployed for six months.
career ; carrière ; She wants a career in medicine.
deadline ; date limite, échéance ; The deadline is Friday.
task ; tâche ; I have three tasks to finish today.
holiday|vacation ; vacances, congé ; I'm on holiday next week.
to earn ; gagner (de l'argent) ; How much do you earn?
`),
T('leisure', 'Loisirs', 'A2', `
hobby ; passe-temps, loisir ; My favourite hobby is photography.
sport ; sport ; Do you do any sport?
football|soccer ; football ; We play football on Sundays.
swimming ; natation ; Swimming is good for your back.
music ; musique ; What kind of music do you like?
song ; chanson ; This is my favourite song.
film|movie ; film ; Let's watch a film tonight.
cinema ; cinéma ; We're going to the cinema.
game ; jeu, partie ; Do you want to play a game?
video game ; jeu vidéo ; He plays video games every evening.
party ; fête, soirée ; Are you coming to my party?
concert ; concert ; The concert was amazing.
photo|picture ; photo ; Can you take a photo of us?
painting ; peinture, tableau ; I love this painting.
beach ; plage ; We spent the day at the beach.
to go for a walk ; aller se promener ; Let's go for a walk after lunch.
match ; match ; Did you watch the match last night?
team ; équipe ; Which team do you support?
player ; joueur ; He is the best player in the team.
fan ; fan, supporter ; I'm a big fan of this band.
band ; groupe (de musique) ; My cousin plays in a band.
to go out ; sortir ; We go out every Friday night.
to have fun ; s'amuser ; Have fun at the party!
free time ; temps libre ; What do you do in your free time?
`),
T('nature', 'Nature, météo et animaux', 'A1', `
weather ; temps (météo) ; What's the weather like today?
sun ; soleil ; The sun is shining.
rain ; pluie ; I love the sound of the rain.
snow ; neige ; The children are playing in the snow.
wind ; vent ; The wind is very strong today.
cloud ; nuage ; There isn't a cloud in the sky.
storm ; orage, tempête ; There was a big storm last night.
sky ; ciel ; The sky is clear tonight.
sea ; mer ; The sea is cold in June.
river ; rivière, fleuve ; The river runs through the city.
lake ; lac ; We swam in the lake.
mountain ; montagne ; We go to the mountains every winter.
forest ; forêt ; There are wolves in this forest.
tree ; arbre ; There's a big tree in our garden.
flower ; fleur ; He gave her some flowers.
grass ; herbe ; Don't walk on the grass.
island ; île ; They live on a small island. ; Le s ne se prononce pas.
sunny ; ensoleillé ; It's sunny today.
cloudy ; nuageux ; It's cloudy, but it's not raining.
rainy ; pluvieux ; It was a rainy day.
windy ; venteux (il y a du vent) ; It's very windy at the beach.
animal ; animal ; What's your favourite animal?
dog ; chien ; My dog loves the park.
cat ; chat ; The cat is sleeping on the sofa.
bird ; oiseau ; I can hear the birds singing.
horse ; cheval ; She rides a horse every weekend.
cow ; vache ; There are cows in the field.
pig ; cochon ; Pigs are very intelligent animals.
sheep ; mouton ; There are a lot of sheep in Wales. ; Pluriel invariable : one sheep, two sheep.
mouse ; souris ; The cat caught a mouse. ; Pluriel irrégulier : mice.
`),
T('health', 'Santé', 'A2', `
doctor ; médecin ; You should see a doctor.
nurse ; infirmier, infirmière ; The nurse gave me an injection.
hospital ; hôpital ; She's still in hospital.
medicine ; médicament(s) ; Take this medicine twice a day.
ill|sick ; malade ; I feel ill. I'm staying at home.
pain ; douleur ; I have a pain in my knee.
headache ; mal de tête ; I've got a terrible headache.
fever|temperature ; fièvre ; She has a high fever.
cough ; toux ; I have a bad cough.
a cold ; rhume ; I've caught a cold.
flu ; grippe ; Half the office has the flu.
healthy ; en bonne santé, sain ; Eat healthy food.
injury ; blessure ; He has a knee injury.
appointment ; rendez-vous (médecin, travail) ; I have a doctor's appointment at three. ; Un rendez-vous amoureux = a date.
prescription ; ordonnance ; You need a prescription for this medicine.
chemist's|pharmacy|drugstore ; pharmacie ; Is there a chemist's near here?
allergy ; allergie ; I have an allergy to nuts.
emergency ; urgence ; In an emergency, call 112.
ambulance ; ambulance ; Call an ambulance!
to hurt ; faire mal ; My back hurts.
to feel better ; se sentir mieux ; I hope you feel better soon.
to get better ; guérir, aller mieux ; Get better soon!
diet ; alimentation, régime ; A good diet is important. ; « diet » = alimentation en général, pas seulement un régime.
to sneeze ; éternuer ; I can't stop sneezing.
`),
T('travel', 'Voyager', 'A2', `
trip ; voyage (court), excursion ; We went on a trip to Rome.
journey ; trajet, voyage ; The journey takes three hours. ; « journey » = le trajet ; une journée = a day.
passport ; passeport ; Don't forget your passport.
luggage ; bagages ; I only have hand luggage. ; Indénombrable : no « luggages ».
suitcase ; valise ; My suitcase is too heavy.
flight ; vol ; Our flight is at six a.m.
plane ; avion ; The plane landed on time.
to book ; réserver ; I booked a table for two.
booking|reservation ; réservation ; I have a booking in the name of Martin.
abroad ; à l'étranger ; I've never lived abroad.
tourist ; touriste ; The city is full of tourists in summer.
return ticket|round-trip ticket ; aller-retour ; A return ticket to Oxford, please.
single ticket|one-way ticket ; aller simple ; How much is a single ticket?
delay ; retard ; There's a two-hour delay.
platform ; quai ; The train leaves from platform 4.
departure ; départ ; Departures are on the first floor.
arrival ; arrivée ; What's our arrival time?
customs ; douane ; We went through customs quickly.
border ; frontière ; We crossed the border at night.
currency ; monnaie, devise ; What's the local currency?
backpack|rucksack ; sac à dos ; I travelled with just a backpack.
view ; vue ; The view from the hotel is amazing.
to land ; atterrir ; The plane lands at noon.
to take off ; décoller ; The plane took off late.
to check in ; s'enregistrer ; You can check in online.
sightseeing ; visites touristiques ; We did some sightseeing in the afternoon.
`),
T('money', 'Argent et achats', 'A2', `
money ; argent ; I don't have much money. ; Indénombrable : money is…
cash ; espèces, liquide ; Can I pay in cash?
card|credit card ; carte bancaire ; Do you take cards?
price ; prix ; The prices are very high here.
change ; monnaie (rendue) ; Keep the change.
coin ; pièce (de monnaie) ; I need some coins for the parking meter.
note|bill ; billet (de banque) ; I only have a fifty-euro note.
receipt ; ticket de caisse, reçu ; Can I have the receipt, please?
the bill|the check ; l'addition ; Could we have the bill, please?
sales ; soldes ; I bought this coat in the sales.
discount ; réduction, remise ; Students get a ten percent discount.
wallet ; portefeuille ; I lost my wallet.
to save ; économiser, épargner ; I'm saving for a new car.
to spend ; dépenser ; I spent too much money this month.
to borrow ; emprunter ; Can I borrow your car? ; borrow = emprunter, lend = prêter.
to lend ; prêter ; Can you lend me ten euros?
to owe ; devoir (de l'argent) ; I owe you twenty euros.
queue|line ; file d'attente ; There was a long queue at the checkout.
checkout ; caisse (magasin) ; Please pay at the checkout.
shop assistant|sales assistant ; vendeur, vendeuse ; The shop assistant was very helpful.
refund ; remboursement ; I'd like a refund, please.
to afford ; avoir les moyens de ; I can't afford a new phone.
bargain ; bonne affaire ; This jacket was a real bargain.
`),
T('feelings', 'Émotions et caractère', 'B1', `
angry ; en colère ; Why are you so angry?
afraid|scared ; avoir peur, effrayé ; I'm afraid of spiders.
worried ; inquiet ; I'm worried about my exam.
proud ; fier ; I'm proud of you.
jealous ; jaloux ; He gets jealous easily.
bored ; s'ennuyer (qui s'ennuie) ; I'm bored. Let's do something. ; bored = qui s'ennuie ; boring = ennuyeux.
boring ; ennuyeux ; This film is really boring.
excited ; impatient, enthousiaste ; I'm so excited about the trip!
disappointed ; déçu ; I was disappointed with the result.
surprised ; surpris ; I was surprised to see him.
embarrassed ; gêné ; I was so embarrassed! ; Faux ami : « embarrassed » = gêné ; embarrassé (encombré) = cluttered.
shy ; timide ; She's very shy with new people.
kind ; gentil ; It's very kind of you.
funny ; drôle ; He's really funny.
lazy ; paresseux ; Don't be lazy, help me!
hard-working ; travailleur ; She's a very hard-working student.
honest ; honnête ; To be honest, I don't like it. ; Le h ne se prononce pas : an honest man.
polite ; poli ; Be polite to your teachers.
rude ; impoli, grossier ; It's rude to interrupt people.
selfish ; égoïste ; Don't be so selfish.
generous ; généreux ; Thank you, that's very generous of you.
confident ; sûr de soi ; She's confident when she speaks in public.
nervous ; nerveux, anxieux ; I'm always nervous before an exam.
calm ; calme ; Stay calm, everything is fine.
lonely ; seul (qui se sent seul) ; He feels lonely in the city.
upset ; contrarié, bouleversé ; She was upset about the news.
grateful ; reconnaissant ; I'm very grateful for your help.
`),
T('linking', 'Mots de liaison', 'B1', `
because ; parce que ; I stayed at home because I was ill.
because of ; à cause de ; The match was cancelled because of the rain.
but ; mais ; I like tea, but I prefer coffee.
so ; donc, alors ; It was late, so we went home.
however ; cependant ; It's expensive. However, it's worth it.
although|though ; bien que ; Although it was raining, we went out. ; Suivi d'une phrase complète, sans subjonctif.
despite|in spite of ; malgré ; Despite the rain, we went out. ; Suivi d'un nom ou d'un -ing, jamais d'une phrase.
whereas|while ; alors que (opposition) ; I love sport, whereas my brother hates it.
unless ; à moins que ; I'll go unless it rains.
otherwise ; sinon ; Hurry up, otherwise we'll be late.
instead ; à la place ; I didn't go out. I stayed at home instead.
instead of ; au lieu de ; Let's walk instead of taking the bus.
even if ; même si ; I'll go even if it rains.
as soon as ; dès que ; Call me as soon as you arrive.
until ; jusqu'à ce que, jusqu'à ; Wait here until I come back.
while ; pendant que ; I read while I was waiting.
meanwhile ; pendant ce temps ; I'll cook. Meanwhile, you can set the table.
therefore ; par conséquent ; He was ill and therefore couldn't come.
moreover|furthermore ; de plus ; The flat is cheap. Moreover, it's near the station.
besides ; d'ailleurs, en plus ; I don't want to go. Besides, I'm tired.
on the other hand ; d'un autre côté ; It's cheap. On the other hand, it's very small.
as a result ; en conséquence ; He didn't study. As a result, he failed.
in addition ; en outre, de plus ; In addition, you will receive a free gift.
first of all ; tout d'abord ; First of all, I'd like to thank you.
finally ; enfin, pour finir ; Finally, add the salt.
eventually ; finalement, au bout du compte ; We eventually found the hotel. ; Faux ami : éventuellement = possibly.
actually ; en fait ; Actually, I don't agree. ; Faux ami : actuellement = currently.
anyway ; de toute façon ; It doesn't matter anyway.
`),
T('tech', 'Technologie', 'A2', `
computer ; ordinateur ; My computer is very slow.
laptop ; ordinateur portable ; I take my laptop to university.
phone|mobile|cell phone ; téléphone (portable) ; My phone is dead. ; dead = batterie vide.
screen ; écran ; The screen is broken.
keyboard ; clavier ; I need a new keyboard.
password ; mot de passe ; I forgot my password.
website ; site web ; Check their website for the prices.
app ; application ; I downloaded a new app.
email ; e-mail, courriel ; I'll send you an email.
to download ; télécharger (vers soi) ; You can download the file here.
to upload ; mettre en ligne, téléverser ; I uploaded the photos.
to delete ; supprimer ; Delete this message, please.
to save (a file) ; enregistrer (un fichier) ; Don't forget to save your work.
battery ; batterie, pile ; My battery is low.
charger ; chargeur ; Can I borrow your charger?
link ; lien ; Click on the link.
account ; compte ; I created an account on the website.
settings ; paramètres, réglages ; Change it in the settings.
update ; mise à jour ; There's an update for your phone.
file ; fichier ; I can't open this file.
folder ; dossier ; Put the photos in a new folder.
printer ; imprimante ; The printer doesn't work.
to log in ; se connecter ; Log in with your email address.
to log out ; se déconnecter ; Don't forget to log out.
to share ; partager ; Share the document with your team.
network ; réseau ; The network is down.
to turn on|to switch on ; allumer (un appareil) ; Turn on the light, please.
to turn off|to switch off ; éteindre ; Switch off your phone during the film.
`),
T('verbs_b1', 'Verbes utiles (B1)', 'B1', `
to achieve ; atteindre, réaliser (un objectif) ; She achieved all her goals. ; Faux ami : achever = to finish.
to avoid ; éviter ; Try to avoid sugar. ; Suivi de -ing : avoid eating.
to improve ; améliorer, s'améliorer ; Your English has improved a lot.
to manage (to) ; réussir à ; I managed to finish on time.
to realise|to realize ; se rendre compte ; I didn't realise it was so late. ; Faux ami : réaliser (un projet) = to carry out, to achieve.
to suggest ; suggérer, proposer ; I suggest leaving early. ; suggest + -ing ou suggest that…, jamais suggest someone to.
to provide ; fournir ; The hotel provides towels.
to require ; exiger, nécessiter ; This job requires patience.
to increase ; augmenter ; Prices have increased.
to reduce ; réduire ; We need to reduce our costs.
to allow ; permettre, autoriser ; Smoking is not allowed here.
to prevent ; empêcher ; The rain prevented us from going out. ; Faux ami : prévenir (avertir) = to warn.
to deal with ; gérer, s'occuper de ; I'll deal with this problem.
to rely on ; compter sur ; You can rely on me.
to expect ; s'attendre à, attendre (quelque chose) ; I didn't expect to see you here.
to complain ; se plaindre ; He always complains about the weather.
to argue ; se disputer ; My neighbours argue all the time. ; Aussi : argumenter (argue that…).
to persuade|to convince ; persuader, convaincre ; She persuaded me to come.
to warn ; prévenir, avertir ; I warned you!
to remind ; rappeler (à quelqu'un) ; Remind me to call my mother. ; remember = se souvenir soi-même ; remind = faire penser à quelqu'un.
to apologise|to apologize ; s'excuser ; He apologised for being late.
to blame ; reprocher, rejeter la faute sur ; Don't blame me!
to belong to ; appartenir à ; This bag belongs to my sister.
to depend on ; dépendre de ; It depends on the weather.
to waste ; gaspiller, perdre (du temps) ; Don't waste your time.
to support ; soutenir ; My family always supports me. ; Faux ami : supporter (tolérer) = to stand, to bear.
to own ; posséder ; They own two houses.
to look forward to ; avoir hâte de ; I'm looking forward to seeing you. ; Suivi de -ing : to est une préposition ici.
to give up ; abandonner, arrêter ; Don't give up!
to find out ; découvrir, apprendre (une information) ; I found out the truth.
`),
T('adjectives2', 'Adjectifs utiles (B1)', 'B1', `
available ; disponible ; Is this room available?
aware ; conscient ; Are you aware of the risks?
convenient ; pratique, commode ; Is Monday convenient for you?
reliable ; fiable ; My car isn't very reliable.
useful ; utile ; This app is really useful.
useless ; inutile ; This old phone is useless.
dangerous ; dangereux ; It's dangerous to swim here.
safe ; sûr, en sécurité ; Is it safe to walk here at night?
comfortable ; confortable, à l'aise ; This chair is very comfortable.
crowded ; bondé ; The train was really crowded.
likely ; probable ; It's likely to rain tomorrow.
obvious ; évident ; The answer is obvious.
similar ; semblable ; Our ideas are very similar.
weird|strange ; bizarre, étrange ; That's weird.
famous ; célèbre ; She's a famous singer.
necessary ; nécessaire ; Is it really necessary?
serious ; sérieux, grave ; Is it serious, doctor?
huge ; énorme ; They live in a huge house.
tiny ; minuscule ; Their flat is tiny.
current ; actuel ; What's your current address? ; Faux ami : actuel = current, pas actual (qui veut dire réel).
sensible ; raisonnable, sensé ; That's a sensible decision. ; Faux ami : sensible = sensitive.
sensitive ; sensible ; She's very sensitive to criticism.
worth ; qui vaut (la peine) ; This film is worth seeing.
entire|whole ; entier ; I spent the whole day in bed.
fair ; juste, équitable ; It's not fair!
quiet ; calme, silencieux ; It's a quiet neighbourhood. ; Ne pas confondre avec quite (assez).
noisy ; bruyant ; The street is very noisy at night.
`),
T('false_friends', 'Faux amis', 'B1', `
bookshop|bookstore ; librairie ; There's a nice bookshop near the station. ; library = bibliothèque.
to attend ; assister à (un cours, une réunion) ; I attended the meeting. ; « attendre » = to wait.
to pretend ; faire semblant ; He pretended to be ill. ; « prétendre » = to claim.
to claim ; prétendre, affirmer ; He claims he saw a ghost.
currently|at the moment ; actuellement ; I'm currently living in Lyon. ; « actually » = en fait.
possibly ; éventuellement ; We could possibly meet next week. ; « eventually » = finalement.
pregnant ; enceinte ; My sister is pregnant.
rental ; location ; The car rental was expensive. ; « location » = emplacement.
location ; emplacement, lieu ; The hotel is in a great location.
warning ; avertissement ; This is your last warning.
to ask ; demander ; Can I ask you something? ; « to demand » = exiger.
to demand ; exiger ; The workers demanded a pay rise.
to injure ; blesser ; Two people were injured in the accident. ; « injurier » = to insult.
secondary school|high school ; collège, lycée ; I went to a secondary school in Lille. ; « college » = études supérieures.
poster ; affiche ; There's a poster on the wall.
plum ; prune ; I love plum jam. ; « prune » en anglais = pruneau.
gentle ; doux (personne, geste) ; Be gentle with the baby. ; « gentil » = kind, nice.
deception ; tromperie ; The whole story was a deception. ; « déception » = disappointment.
disappointment ; déception ; The film was a big disappointment.
to control|to check ; contrôler, vérifier ; Check your answers before you finish. ; check = vérifier ; control = maîtriser, diriger.
large ; grand (taille d'un objet, d'une boisson) ; I'd like a large coffee. ; « large » (en largeur) = wide.
wide ; large ; The river is very wide here.
chance ; occasion, possibilité ; This is your chance! ; « la chance » = luck.
luck ; chance (hasard) ; Good luck with your exam!
cave ; grotte ; We explored a cave. ; « une cave » = cellar.
cellar ; cave ; We keep the wine in the cellar.
`),
T('society', 'Société et actualité', 'B2', `
government ; gouvernement ; The government announced new measures.
election ; élection ; Who won the election?
law ; loi, droit ; It's against the law.
crime ; criminalité, crime, délit ; Crime has fallen in the city.
unemployment ; chômage ; Unemployment is rising.
poverty ; pauvreté ; Millions of people live in poverty.
wealth ; richesse ; Wealth is not evenly distributed.
climate change ; changement climatique ; Climate change is a global problem.
pollution ; pollution ; Air pollution is a big problem in cities.
environment ; environnement ; We must protect the environment.
economy ; économie ; The economy is growing slowly. ; Faire des économies = to save money.
rights ; droits ; Everyone should have the same rights.
citizen ; citoyen ; Every citizen has the right to vote.
to vote ; voter ; Did you vote in the last election?
debate ; débat ; There was a heated debate on TV.
survey ; sondage, enquête ; According to a recent survey, most people agree.
issue ; question, problème (sujet) ; Housing is a major issue.
threat ; menace ; Pollution is a threat to our health.
growth ; croissance ; Economic growth has slowed down.
inequality ; inégalité ; Inequality is increasing.
policy ; politique (mesures) ; The new policy will start in January. ; policy = les mesures ; politics = la vie politique.
politics ; politique (vie politique) ; I'm not interested in politics.
refugee ; réfugié ; The country welcomed thousands of refugees.
war ; guerre ; The war lasted four years.
peace ; paix ; They signed a peace agreement.
healthcare ; soins de santé, système de santé ; Healthcare is free in many countries.
taxes ; impôts, taxes ; We pay a lot of taxes.
charity ; association caritative ; She works for a charity.
protest ; manifestation ; There was a protest in front of the parliament.
trial ; procès ; The trial will start next week.
`),
T('verbs_b2', 'Verbes avancés (B2)', 'B2', `
to assess ; évaluer ; We need to assess the situation.
to tackle ; s'attaquer à (un problème) ; The government must tackle unemployment.
to enhance ; améliorer, renforcer ; This will enhance your chances.
to undermine ; saper, affaiblir ; The scandal undermined his authority.
to foster ; encourager, favoriser ; We want to foster creativity.
to overcome ; surmonter ; She overcame many difficulties.
to cope with ; faire face à ; How do you cope with stress?
to carry out ; réaliser, mener ; They carried out a survey.
to point out ; faire remarquer, souligner ; He pointed out a mistake in my report.
to come up with ; trouver (une idée) ; She came up with a great idea.
to put off ; remettre à plus tard ; Don't put off your homework.
to turn down ; refuser (une offre) ; He turned down the job offer.
to figure out|to work out ; comprendre, trouver (la solution) ; I can't figure out how it works.
to keep up with ; suivre le rythme de ; It's hard to keep up with the news.
to run out of ; être à court de ; We've run out of milk.
to take into account ; prendre en compte ; We must take the costs into account.
to commit ; commettre, s'engager ; He committed a crime.
to emphasise|to emphasize ; souligner, mettre l'accent sur ; She emphasised the importance of sleep.
to ensure ; garantir, s'assurer que ; Please ensure that the door is locked.
to struggle ; avoir du mal, se battre ; I struggled to understand him.
to thrive ; prospérer, s'épanouir ; Small businesses are thriving.
to acknowledge ; reconnaître, admettre ; He acknowledged his mistake.
to deny ; nier ; She denied everything.
to postpone ; reporter ; The meeting was postponed.
to hesitate ; hésiter ; Don't hesitate to call me.
`),
];

export const WORDS = THEMES.flatMap((t) => t.words.map((w) => ({ ...w, theme: t.id, level: t.level })));
export const WORD_BY_ID = Object.fromEntries(WORDS.map((w) => [w.id, w]));
