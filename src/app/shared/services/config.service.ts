import { HttpClient } from '@angular/common/http';
import { Injectable, APP_INITIALIZER } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config: any;
  constructor(private http: HttpClient) {}

  loadConfig() {
    return this.http
      .get('/config.json')
      .toPromise()
      .then((cfg) => (this.config = cfg));
  }

  get googleClientId() {
    return this.config.googleClientId;
  }
  // getters para otras variables
}

export function initConfig(configService: ConfigService) {
  return () => configService.loadConfig();
}

// en app.module.ts
providers: [
  ConfigService,
  {
    provide: APP_INITIALIZER,
    useFactory: initConfig,
    deps: [ConfigService],
    multi: true,
  },
];
