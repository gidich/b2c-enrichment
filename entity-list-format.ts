 module EntityListFormat {
    export interface Entity {
        name: string;
        id: string;
    }
    export interface EntityList {
        entities: Entity[];
    }
}

export default EntityListFormat;