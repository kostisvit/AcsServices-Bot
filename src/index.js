const { ConsoleBot } = require("bottender");

const unknownResponse = "Sorry.\n I don't understand.";

async function SayHello(context) {
  await context.sendText('Greetings!!\n How can I help you?');
  await context.sendText('What is the name you are looking for?')

  context.setState({
    current_state: 'waiting_name'
})

  context.setState({
    current_state: 'waiting_email'
})
}

const hiArray = [
  'hi',
  'hello',
  'hey'
]

// const employeeInfo = [
//   'phone',
//   'mobile'
// ]

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
    if ( context.state.current_state = 'waiting_name' && employees[input] ){
      await context.sendText(employees[input].tel);
      await context.sendText('Something else?');

      context.setState({
        current_state: 'waiting_name'
      })
    } else if ( input === 'email') {
      
      
      

      // console.log(employees.kostas.email);
        

    }
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