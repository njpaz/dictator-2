import Ember from 'ember';

export default Ember.Component.extend({
  recognition: null,
  isRecording: false,
  results: null,
  disabled: false,
  accuracy: null,

  didInsertElement: function() {
    if (window.webkitSpeechRecognition) {
      Ember.run.schedule("afterRender", this._setRecognition.bind(this));
    } else {
      this.toggleProperty("disabled");
    }
  },

  _setRecognition: function() {
    this.set("recognition", new window.webkitSpeechRecognition());
  },

  actions: {
    record: function() {
      var recognition = this.get("recognition");
      var _this = this;
      this.toggleProperty("isRecording");

      if (this.get("isRecording")) {
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.start();
        recognition.onresult = function(event) {
          _this.set("results", event.results[0][0].transcript);
          _this.set("accuracy", event.results[0][0].confidence);
        }
      } else {
        recognition.stop();
      }
    }
  }
});
