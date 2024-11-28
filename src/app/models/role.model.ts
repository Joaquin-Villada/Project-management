export interface Role {
  id:        number;
  name:      string;
  developer: Developer[];
}

export interface Developer {
  id:           number;
  mail:         string;
  role:        Role;
  name:         string;
  startDate:    Date;
  creationDate: Date;
  updateDate:   Date | null;
}
