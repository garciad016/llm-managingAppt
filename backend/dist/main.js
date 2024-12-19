"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_client_exception_filter_1 = require("./prisma-client-exception/prisma-client-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    const port = 3000;
    app.setGlobalPrefix(globalPrefix);
    setupSwagger(app);
    const { httpAdapter } = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new prisma_client_exception_filter_1.PrismaClientExceptionFilter(httpAdapter));
    await app.listen(port);
    common_1.Logger.log(`:rocket: Application is running on: http://localhost:${port}/${globalPrefix}`);
}
function setupSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Doctor's appointment API")
        .setDescription("The API for Doctor's appointment backend.")
        .addBearerAuth()
        .setVersion('0.1')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, {
        jsonDocumentUrl: '/api-json',
    });
}
bootstrap();
//# sourceMappingURL=main.js.map