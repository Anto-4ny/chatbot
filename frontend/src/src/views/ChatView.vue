// ChatView.vue
<template>
  <div class="chat-container">
    <h2>Chatbot</h2>
    <ChatInterface />
  </div>
</template>

<script>
import ChatInterface from '../components/ChatInterface.vue';
export default {
  components: { ChatInterface }
}
</script>
