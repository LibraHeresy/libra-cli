import Vue from 'vue';

const zhouTpl = {
  name: "button-counter",
  props: ["count"],
  methods: {
    onClick() {
      this.$emit("change", this.count + 1);
    }
  },
  render() {
    return (
      <div></div>
    );
  }
}

export default zhouTpl