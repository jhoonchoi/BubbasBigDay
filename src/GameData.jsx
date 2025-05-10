// Game data structure
export const gameData = {
    title: "Bubba's Big Day",
    introduction: {
      title: "Bubba's Big Day",
      story: "After waiting for what feels like forever for the proposal, baby has decided to take matters into her own hands, and hunt down Bubba. Bubba seems to be nowhere to be found, but there's a trail of clues left around Boston. Follow the path of crumbs, complete the challenges at each location, and perhaps you'll find what you've been waiting for at the end of this adventure...",
      instructions: "At each location, you'll need to:\n1. Enter Bubba's secret passcode to access his challenges\n2. Complete Bubba's secret challenges\n3. Maybe he has some riddles to help him remember other stops..."
    },
    locations: [
      {
        id: "apartment",
        name: "Baby's Apartment",
        passcode: "0628",
        description: "You've found Bubba's secret notebook with his plan to propose to you. You'll need to crack his passcode to access his notes.",
        challenges: [
          {
            type: "completion",
            prompt: "Make sure Rachel has her big day outfit packed in a bag",
            answer: "yes",
            hint: "The white one. Don't wear it, pack it."
          },
          {
            type: "completion",
            prompt: "Make sure Rachel has her make up and hair done nicely",
            answer: "yes",
            hint: "Uhh, I'm not the expert here"
          },
          {
            type: "completion",
            prompt: "Make sure Rachel brushes her teeth",
            answer: "yes",
            hint: "Might be useful later..."
          }
        ],
        finalRiddle: {
          prompt: "Our ____ ____ spot, where we get our ____ fix and a good start to the day", // Sunday, morning, caffeine
          letterBank: "XEFCIAFETO",
          answer: "cafe fixe",
          hint: "Caffeine Fix... you get it?"
        },
        nextLocation: "Café Fixe at 1642 Beacon St, Brookline. Tell them you're there for 'Today's Special Coffee'."
      },
      {
        id: "cafe",
        name: "Café Fixe",
        passcode: "latte",
        description: "Our favorite spot for a good cup of coffee. Tell them you're there for 'Today's Special Coffee'",
        challenges: [
          {
            type: "completion",
            prompt: "Let's get a coffee for Rachel, and a coffee for nunnie and Cheska too",
            answer: "yes",
            hint: "That's a lot of coffee"
          },
          {
            type: "question",
            prompt: "What is my go to order?",
            answer: "iced americano",
            hint: "Typical FOB Korean of me"
          }
        ],
        finalRiddle: {
          prompt: "Nunnie's pick for the ____ ____ spot in town", // trendiest, brunch
          letterBank: "BAVRALHIABLTA",
          answer: "bar vlaha",
          hint: "#2 in Yelp's list of brunch spots in Brookline"
        },
        nextLocation: "Bar Vlaha at 1653 Beacon St, Brookline. Let's ask the staff for the 'Secret Table for 3'."
      },
      {
        id: "restaurant",
        name: "Bar Vlaha",
        passcode: "tzatziki",
        description: "Boston's finest brunch spot. Ask the staff for the 'Secret Table for 3'",
        challenges: [
          {
            type: "completion",
            prompt: "Let Rachel order her heart out",
            answer: "yes",
            hint: "At least 4 items and some drinks"
          },
          {
            type: "question",
            prompt: "What's something I'd pick, but you'd never eat?",
            answer: "lamb",
            hint: "souvla and chops"
          }
        ],
        finalRiddle: {
          prompt: "A special clinic to clean up my ____ ____. Maybe they can give my ____ a helping hand too!", // chubby, digits, cutie(cles)
          letterBank: "NTSALIUHTDOEI",
          hint: "You've been here with your bestest friend",
          answer: "The nail studio"
        },
        nextLocation: "The Nail Studio at 215 Newbury St, Boston. Tell them you're there for the 'Special Package'."
      },
      {
        id: "nailsalon",
        name: "The Nail Studio",
        passcode: "cuticle",
        description: "Baby's gotta get her nails taken care of",
        challenges: [
          {
            type: "completion",
            prompt: "Choose a nail color of Rachel's liking",
            answer: "yes",
            hint: "Get those cuticles too"
          }
        ],
        finalRiddle: {
          prompt: "Your Bubby awaits you in a place of ____ and ____ ____", // rest, private, luxury
          letterBank: "THOTELEH",
          answer: "the hotel",
          hint: "We've only been to one together once."
        },
        nextLocation: "154 Berkeley St, Boston. Go to the lobby and seek out a Mexican Agent."
      },
      {
        id: "hotel",
        name: "The Hotel",
        passcode: "suite",
        description: "Your Bubba awaits you",
        challenges: [
          {
            type: "task",
            prompt: "Go to the hotel lobby and tell me the name of `the Mexican Agent",
            answer: "Andrew Ong Garcia",
            hint: "He'll behave I promise."
          },
          {
            type: "completion",
            prompt: "Make sure Rachel knows where the bathroom is so she can change.",
            answer: "yes",
            hint: "Ask our friend"
          },
          {
            type: "completion",
            prompt: "Go to room 934",
            answer: "yes",
            hint: "Follow your heart"
          },
          {
            type: "completion",
            prompt: "Open the door and come inside",
            answer: "yes",
            hint: "Follow your heart"
          }
        ],
        finalMessage: "This journey ends where our new beginning starts..."
      }
    ]
  };