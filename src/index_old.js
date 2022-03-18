const { router, text} = require('bottender/router');
const unknownResponse = "Sorry.\n I don't understand.";

async function SayHi(context) {
  await context.sendText('Greetings!!! \n How can i help you?');
  await context.sendText('What is the name you are looking for?');
  
  context.setState({
    current_state: 'waiting_name'
  })
}

const employees = {
  'kostas': {
    'tel': '27420 21345'
  },

}


async function Unknown(context) {
  if ( context.event.isText ) {
    const input = context.event.text.toLowerCase();
    if ( context.state.current_state === 'waiting_name' && employees[input] ) {
      await context.sendText(employees[input].tel);
      await context.sendText('Type user\'s email');

      context.setState({
        current_state: 'waiting_email'
      })
    } else if ( input === 'how is the weather today?') {

    } else if ( input === 'what is my name?') {
      await context.getUserProfile().then(async function(user){
        await context.sendText(user.name);
      })
    } else {
      await context.sendText(unknownResponse);
    }
    
  } else {
    await context.sendText(unknownResponse);
  }
}

const hiArray = [
  'hi',
  'hello',
  'hey'
]

module.exports = async function App(context) {
  // if (context.event.text == 'hi') {
  //   return SayHi;
  // }
  // return Unknown;

  if ( context.event.isText && hiArray.includes(context.event.text.toLowerCase())) {
    return SayHi;
  }

  // if ( context.event.isText && 
  //   (context.event.text.toLowerCase() === 'hi' || 
  //   context.event.text.toLowerCase() === 'hello' ||
  //   context.event.text.toLowerCase() === 'hey') ) {
  //   return SayHi;
  // }

  // return router([
  //   text(['hi','hello','hey'], SayHi),
  //   text('*', Unknown),
  // ]);

  return Unknown;
};

//------------------------------//
const { ConsoleBot } = require("bottender");

const unknownResponse = "Sorry.\n I don't understand.";

async function SayHello(context) {
  await context.sendText('Greetings!!\n How can I help you?');
  await context.sendText('What is the name you are looking for?')

  context.setState({
    current_state: 'waiting_name'
})

//   context.setState({
//     current_state: 'waiting_email'
// })
}

const hiArray = [
  'hi',
  'hello',
  'hey'
]


const employees = {
  'kostas': {
    'tel': '27420-25537',
    'mobile': '6936486424',
    'email': 'kostasvit@acsservices.gr'
  }
}



async function Unknown(context) {
  if ( context.event.isText ) {
    const input = context.event.text.toLowerCase();
    if ( context.state.current_state == 'waiting_name' && employees[input] ){
      await context.sendText(`
        Tel: ${employees[input].tel}\n
        Mobile: ${employees[input].mobile}\n
        Email: ${employees[input].email}
      `);
      
      await context.sendText('Something else? Type another name.');

      context.setState({
        current_state: 'waiting_name',
        //current_state: 'waiting_email',
        //employee: input
      })
    }
    // } else if ( context.state.current_state == 'waiting_email' && input === 'email') {
    //   const employee = context.state.employee;
    //   const email = employees[employee].email;
    //   await context.sendText(email);

    //   // console.log(employees.kostas.email);
    //   context.setState({
    //     current_state: 'waiting_mobile',

    //   }) 

    // }

    else {
      await context.sendText(unknownResponse);
    }
  }
}

module.exports = async function App(context) {
  if ( context.event.isText && hiArray.includes(context.event.text.toLowerCase())){
    return SayHello
  } 

  return Unknown
};