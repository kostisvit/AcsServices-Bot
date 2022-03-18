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
  },
  'john': {
    'tel': '22220-55555',
    'mobile': '6969696969',
    'email': 'test@email.com'
  }
}



async function Unknown(context) {
  if ( context.event.isText ) {
    const input = context.event.text.toLowerCase();
    if ( context.state.current_state == 'waiting_name' && employees[input] ){
      await context.sendText(employees[input].tel);
      
      await context.sendText('Something else?');

      context.setState({
        current_state: 'waiting_email',
        // current_state: 'waiting_email',
        employee: input
      })
    } else if ( context.state.current_state == 'waiting_email' && input === 'email') {
      const employee = context.state.employee;
      const email = employees[employee].email;
      await context.sendText(email);

      // console.log(employees.kostas.email);
      context.setState({
        current_state: 'waiting_mobile',
      }) 
    } else if ( context.state.current_state == 'waiting_mobile' && input ==='mobile'){
      const employee = context.state.employee;
      const mobile = employees[employee].mobile;
      await context.sendText(mobile);
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