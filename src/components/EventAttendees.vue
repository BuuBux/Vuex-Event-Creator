<template>
  <div class="attendees-field">
    {{title}}
    <ul class="options">
      <li
        @click="addAttendee(user)"
        :key="user.id"
        v-for="user in filterByUsing(registered)"> {{user.name}} </li>
    </ul>
    <div v-if="attendees.length !== 0" class="">
      <ul>
        <li
          :key="user.id"
          v-for="user in attendees">
            {{user.name}} <span v-html="icons.trash" @click="removeAttendee(user)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { User } from '@/types/UserTyping';
import icons from '@/helpers/icons';
import { SvgIcons } from '@/types/IconsTyping';

const namespace = 'user';

@Component
export default class EventAttendees extends Vue {
  @Prop(String) title: string;

  @State('user', { namespace }) user: User;

  @State('registeredUsers', { namespace }) registeredUsers: User[];

  public icons: SvgIcons = icons;

  public registered: User[] = [];

  public attendees: User[] = [];

  public filterByUsing(users: User[]) {
    return users.filter((user: User) => user.id !== this.user.id);
  }

  public addAttendee(user: User) {
    this.attendees.push(user);
    this.registered = this.registered.filter(
      (registeredUser: User) => registeredUser.id !== user.id,
    );
  }

  public removeAttendee(user: User) {
    this.attendees = this.attendees.filter((attendee: User) => attendee.id !== user.id);
  }

  public mounted() {
    this.registered = this.registeredUsers;
  }
}
</script>

<style lang="scss" scoped>

</style>
