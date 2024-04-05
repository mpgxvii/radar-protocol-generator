export const DEFAULT_REPOSITORY = 'https://raw.githubusercontent.com/RADAR-CNS/RADAR-REDCap-aRMT-Definitions/master/questionnaires/';
export const DEFAULT_AVSC = 'questionnaire'
export const defaultProtocol = {
    name: 'PHQ8',
    showIntroduction: false,
    showInCalendar: false,
    isDemo: false,
    order: 4,
    questionnaire: {
      repository: DEFAULT_REPOSITORY,
      name: '',
      avsc: DEFAULT_AVSC
    },
    startText: {
      en: '',
      it: '',
      nl: '',
      da: '',
      de: '',
      es: ''
    },
    endText: {
      en: '',
      it: '',
      nl: '',
      da: '',
      de: '',
      es: ''
    },
    warn: {
      en: '',
      it: '',
      nl: '',
      da: '',
      de: '',
      es: ''
    },
    estimatedCompletionTime: 2,
    protocol: {
      repeatProtocol: {
        unit: 'day',
        amount: 28
      },
      repeatQuestionnaire: {
        unit: 'min',
        unitsFromZero: [480]
      },
      reminders: {
        unit: 'hour',
        amount: 24,
        repeat: 2
      },
      completionWindow: {
        unit: 'day',
        amount: 4
      },
      notification: {
        title: {
          en: 'Questionnaire time'
        },
        text: {
          en: 'Please finish them within 3 days.'
        }
      }
    }
  }