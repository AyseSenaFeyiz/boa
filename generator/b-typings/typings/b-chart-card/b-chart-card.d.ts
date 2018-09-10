
declare namespace __BChartCard {
    interface BChartCardProps extends __BComponent.BComponentProps {
        title?: string;
        fieldName?: string;
        series?: any[]; // TODO: any yerine, yukar�da type tan�mlan�p o verilebilir.
        dataSource?: any[]; // TODO: any yerine, yukar�da type tan�mlan�p o verilebilir.
        widgetId?: number;
        parameters?: any;
    }

    interface BChartCardInstance extends __BComponent.BComponentInstance {
    }

    export class BChartCard extends __BComponent.BComponetBase<BChartCardProps, BChartCardInstance> { }
}

declare module 'b-chart-card' {
    export import BChartCard = __BChartCard.BChartCard;
    export default BChartCard;
}