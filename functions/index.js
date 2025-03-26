const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const firestore = admin.firestore();

exports.sendScheduledMessages = functions.pubsub.schedule('every 1 minute').onRun(async (context) => {
  const now = new Date().toISOString();
  try {
        const snapshot = await firestore
      .collection('scheduledMessages')
      .where('status', '==', 'scheduled')
      .where('scheduleTime', '<=', now)
      .get();

    if (snapshot.empty) {
      console.log('Nenhuma mensagem agendada para envio.');
      return null;
    }

    const batch = firestore.batch();

    snapshot.docs.forEach((doc) => {
      const messageRef = doc.ref;
      batch.update(messageRef, { status: 'sent' });
    });

    await batch.commit();
    console.log('Mensagens enviadas com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar mensagens agendadas:', error);
  }

  return null;
});