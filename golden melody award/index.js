// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome, you launch the golden melody award. What can I help you?';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const SingerIntentHandler = {
	canHandle(handlerInput) {

        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'SingerIntent';
    },

    handle(handlerInput) {
    	 const speechText = `Sorry! I don't know which award you asked.`;

    	 return handlerInput.responseBuilder
                .speak(speechText)

                .reprompt(speechText)

                .getResponse();
    }
};

/*
const SingerIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'SingerIntent';
    },
    handle(handlerInput) {
        if(handlerInput.requestEnvelope.request.intent.slots.award.value == "the best male singer"){
            const speechText = `The winner is Leo Wang.`;
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
                
        } else if (handlerInput.requestEnvelope.request.intent.slots.award.value == "the best female singer"){
            const speechText = `The winner is Sandy Lam.`;
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
            
        } else if (handlerInput.requestEnvelope.request.intent.slots.award.value == "the best band"){
            const speechText = `The winner is Chthonic.`;
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
            
        } else {
            const speechText = `Sorry! I don't know which award you asked.`;
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
        }
    }
};*/

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {

        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {

        const speechText = 'Leaving golden melody award. Goodbye!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        SingerIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
