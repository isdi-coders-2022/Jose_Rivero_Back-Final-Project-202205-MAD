import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ShopCartService } from './shop-cart.service';

import { UpdateShopCartDto } from './dto/update-shop-cart.dto';

@Controller('shopcart')
export class ShopCartController {
    constructor(private readonly shopCartService: ShopCartService) {}

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.shopCartService.findOne(id);
    }

    @Patch('add/:id')
    updateAdd(
        @Param('id') id: string,
        @Body() updateShopCartDto: UpdateShopCartDto
    ) {
        return this.shopCartService.updateAdd(id, updateShopCartDto);
    }

    @Patch('remove/:id')
    updateRemove(
        @Param('id') id: string,
        @Body() updateShopCartDto: UpdateShopCartDto
    ) {
        return this.shopCartService.updateRemove(id, updateShopCartDto);
    }
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateShopCartDto: UpdateShopCartDto
    ) {
        return this.shopCartService.update(id, updateShopCartDto);
    }
}
