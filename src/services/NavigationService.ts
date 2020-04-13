import router from '@/router';

export default class NavigationService {
  public details = 'event-details';

  public filtered = 'event-filtered';

  public list = 'event-list';

  public creating = 'event-create';

  public navigateToDetails(eventId: number) {
    router.push({ name: this.details, params: { id: (eventId).toString() } })
      .then((r) => {
        console.log(r);
      });
  }

  public showOnlyOrganizerEvents(organizer: string) {
    router.push({ name: this.filtered, params: { organizer } })
      .then((r) => {
        console.log(r);
      });
  }

  public goBackToList() {
    router.push({ name: this.list })
      .then((r) => {
        console.log(r);
      });
  }

  public newEvent() {
    router.push({ name: this.creating })
      .then((r) => {
        console.log(r);
      });
  }
}
